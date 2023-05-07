'use client';

import { createBrowserSupabaseClient, SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { Database } from '@/lib/database.types';

type SupabaseContext = {
  supabase: SupabaseClient<Database>
}

const Context = createContext<SupabaseContext | undefined>(undefined);

const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
	const [ supabase ] = useState(() => createBrowserSupabaseClient({
		supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
		supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, 
	}));
	const router = useRouter();

	useEffect(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
			router.refresh();
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [ router, supabase ]);

	const contextValue = useMemo(() => ({ supabase }), [ supabase ]);

	return (
		<Context.Provider value={ contextValue }>
			<>{ children }</>
		</Context.Provider>
	);
};

export default SupabaseProvider;

export const useSupabase = () => {
	const context = useContext(Context);

	if (context === undefined) {
		throw new Error('useSupabase must be used inside SupabaseProvider');
	}

	return context;
};