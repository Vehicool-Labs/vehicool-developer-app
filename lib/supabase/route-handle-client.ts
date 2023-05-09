import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const createSupabaseClient = ({
	headers,
	cookies,
}: {
	headers: () => any,
	cookies: () => any,
}) => createRouteHandlerSupabaseClient({
	supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
	supabaseKey: process.env.SUPABASE_SERVICE_KEY,
	headers,
	cookies,
});

export default createSupabaseClient;