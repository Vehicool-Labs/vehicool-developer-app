import { headers, cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import createSupabaseClient from '@/lib/supabase/route-handle-client';
import { getApiKey } from '@/services/api-key';
import { getBrandsQuery } from '@/services/vehicles/brands';
import { buildError, sendError } from '@/utils/errors.utils';

export const GET = async (request: Request) => {
	const supabase = createSupabaseClient({
		headers,
		cookies, 
	});

	try {
		const { searchParams } = new URL(request.url);
		const apiKey = searchParams.get('api_key');

		if (!apiKey) throw buildError({
			message: 'Please provide a valid API Key.',
			status: 401, 
		});

		const apiKeyData = await getApiKey(supabase, apiKey);
		await supabase.from('api_keys').update({ global_requests_count: apiKeyData.global_requests_count + 1 }).eq('id', apiKeyData.id);

		const searchQuery = searchParams.get('search');
		const filterCountryQuery = searchParams.get('country');

		const { data: vehicleBrands, error } = await getBrandsQuery(supabase, {
			searchQuery,
			filters: { country: filterCountryQuery?.split(',').map(el => el.trim()) || [] }, 
		});

		if (error) throw error;

		return NextResponse.json(vehicleBrands);
	} catch (error) {
		return sendError(error);
	}
};
