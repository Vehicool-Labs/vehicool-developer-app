import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: {
    params: { name: string };
  }) => {
	const { searchParams } = new URL(request.url);
	const apiKey = searchParams.get('api_key');
	if (!apiKey) {
		return NextResponse.json({ error: 'Please provide a valid API Key.' }, { status: 401 });
	}
	const searchQuery = searchParams.get('query');
	if (!searchQuery) {
		return NextResponse.json({ error: 'Please provide a query parameter.' }, { status: 422 });
	}
	const supabase = createRouteHandlerSupabaseClient({
		supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
		supabaseKey: process.env.SUPABASE_SERVICE_KEY,
		headers,
		cookies,
	  });
	const { data: apiKeyData, error: apiKeyError } = await supabase.from('api_keys').select().eq('api_key', apiKey);
	if (apiKeyError) {
		return NextResponse.json({ error: apiKeyError.message }, { status: 500 });
	}
	const apiKeyObj = apiKeyData ? apiKeyData[ 0 ] : null;
	if (!apiKeyObj || !apiKeyObj.is_active) {
		return NextResponse.json({ error: 'Please provide a valid API Key.' }, { status: 401 });
	}
	await supabase.from('api_keys').update({ global_requests_count: apiKeyObj.global_requests_count + 1 }).eq('id', apiKeyObj.id);
	const { data: vehicleBrands, error } = await supabase.from('vehicle_brands').select().textSearch('name', searchQuery.trim().split(' ').join(' & '));
	// TODO PARTIAL SEARCH => Ex: "ren" => ["Renault"]
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
	return NextResponse.json(vehicleBrands);
};
