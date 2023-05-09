import { SupabaseClient } from '@supabase/supabase-js';

export const getApiKey = async (supabase: SupabaseClient, apiKey: string) => {
	const { data: apiKeyData, error: apiKeyError } = await supabase.from('api_keys').select().eq('api_key', apiKey);
	if (apiKeyError) {
		throw apiKeyError;
	}
	const apiKeyObj = apiKeyData ? apiKeyData[ 0 ] : null;
	if (!apiKeyObj || !apiKeyObj.is_active) {
		throw {
			message: 'Please provide a valid API key.',
			status: 401,
		};
	}
	return apiKeyObj;
};