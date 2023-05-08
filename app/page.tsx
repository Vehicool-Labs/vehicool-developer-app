'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSupabase } from './supabase-provider';


const HomePage = () => {

	const router = useRouter();
	const { supabase } = useSupabase();

	useEffect(() => {
		supabase.auth.getSession()
			.then(({ data, error }) => {
				if (error || !data.session) {
					router.push('/auth/signin');
					return;
				}
				router.push('/dashboard');
			});
	}, [ supabase ]);

	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<h1 className="text-blue-500 font-bold text-4xl mb-4">Welcome on Vehicool for Developers.</h1>
			<h2 className="font-semibold text-2xl">Use the Vehicool API to improve your app.</h2>
		</main>
	);
};

export default HomePage;
