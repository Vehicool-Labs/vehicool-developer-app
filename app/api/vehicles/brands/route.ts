import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async () => {
	const supabase = createRouteHandlerSupabaseClient({
		supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
		supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		headers,
		cookies,
	  });

	  const { data } = await supabase.from('vehicle_brands').select('*');
	  console.log(data);
	return NextResponse.json(data);
};
