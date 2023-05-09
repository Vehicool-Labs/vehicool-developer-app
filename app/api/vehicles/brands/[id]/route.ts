import { headers, cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import createSupabaseClient from '@/lib/supabase/route-handle-client';
import { getApiKey } from '@/services/api-key';
import { buildError, sendError } from '@/utils/errors.utils';

export const GET = async (request: Request, { params }: {
    params: { id: string };
  }) => {

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

		const { data: vehicleBrands, error } = await supabase.from('vehicle_brands').select().eq('id', +params.id);

		if (error) throw error;

		const vehicleBrand = vehicleBrands ? vehicleBrands[ 0 ] : null;
		if (!vehicleBrand) throw {
			message: `Brand not found with id ${ params.id }`,
			status: 404,
		};

		return NextResponse.json(vehicleBrand);
	} catch (error) {
		return sendError(error);
	}
};
