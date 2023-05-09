'use client';

import { useState } from 'react';

import { useApiKeyContext } from '@/context/ApiKey.context';
import CreateApiKeyBlock from '@/features/api-key/CreateApikKeyBlock';
import DisplayApiKeyBlock from '@/features/api-key/DisplayApiKeyBlock';

import { useSupabase } from '../supabase-provider';

const ApiKeyPage = () => {

	const { supabase } = useSupabase();
	const { apiKey, createApiKey } = useApiKeyContext();

	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const handleClickCreateApiKey = async () => {
		setIsLoading(true);
		try {
			const { data, error } =await supabase.auth.getUser();
			if (error || !data.user) {
				console.error(error);
				return;
			}
			await createApiKey(data.user.id);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-[1280px]">
			<h1 className="text-2xl text-blue-500 font-bold mb-8">API Key</h1>
			{
				!apiKey ?
					<CreateApiKeyBlock
						isLoading={ isLoading }
						onClickCreateApiKey={ handleClickCreateApiKey }
					/>
					: null
			}
			{ apiKey ? <DisplayApiKeyBlock apiKey={ apiKey } /> : null }
		</div>
	);
};

export default ApiKeyPage;