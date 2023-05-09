'use client';

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { useSupabase } from '@/app/supabase-provider';

export type ApiKey = {
    api_key: string;
    created_at: string | null;
    id: number;
    user_id: string;
};

type ApiKeyContextType = {
	apiKey: ApiKey | null,
	refreshApiKey: () => Promise<ApiKey>,
	createApiKey: (currentUserId: string) => Promise<void>,
};

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const useApiKeyContext = () => {
	const context = useContext(ApiKeyContext);

	if (context === undefined) {
		throw new Error('useApiKeyContext must be used inside ApiKeyContextProvider');
	}

	return context;
};

const ApiKeyContextProvider = ({ children }: { children: ReactNode }) => {

	const [ apiKey, setApiKey ] = useState<ApiKey | null>(null);

	const { supabase } = useSupabase();

	const getApiKey = useCallback(async () => {
		try {
			const { data, error } = await supabase.from('api_keys').select();
			if (error) {
				throw error;
			}
			const [ retrievedApiKey ] = data;
			setApiKey(retrievedApiKey);
			return retrievedApiKey;
		} catch (error) {
			throw error;
		}
	}, [ supabase ]);

	const createApiKey = useCallback(async (currentUserId: string) => {
		try {
			const { error } = await supabase.from('api_keys').insert({ user_id: currentUserId });
			if (error) {
				throw error;
			}
			return;
		} catch (error) {
			throw error;
		}
	}, [ supabase ]);

	useEffect(() => {
		getApiKey();
	}, []);

	const contextValue = useMemo(() => ({
		apiKey,
		refreshApiKey: getApiKey,
		createApiKey,
	}), [ apiKey, getApiKey, createApiKey ]);

	return (
		<ApiKeyContext.Provider value={ contextValue }>
			{ children }
		</ApiKeyContext.Provider>
	);
};

export default ApiKeyContextProvider;