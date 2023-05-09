import { SupabaseClient } from '@supabase/supabase-js';

type GetBrandsQueryOptions = {
	searchQuery?: string | null;
	filters?: {
		country?: string[];
	};
};

export const getBrandsQuery = async (supabase: SupabaseClient, options?: GetBrandsQueryOptions) => {

	let vehicleBrandsQuery = supabase.from('vehicle_brands').select();
	
	if (options?.filters?.country && options.filters.country.length !== 0) {
		vehicleBrandsQuery = vehicleBrandsQuery.in('country', options.filters.country);
	}

	if (options?.searchQuery) {
		vehicleBrandsQuery = vehicleBrandsQuery.ilike('name', `%${ options.searchQuery.trim() }%`);
	}
	
	return await vehicleBrandsQuery;
};