'use client';

import { faTire } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
					console.error('ROOT ERROR >>>', error);
					router.push('/auth/signin');
					return;
				}
				supabase.auth.refreshSession()
					.finally(() => {
						router.push('/dashboard');
					});
			}).catch(error => {
				console.error('ROOT ERROR', error);
			});
	}, [ supabase ]);

	return (
		<div className="flex min-h-screen flex-col items-center p-24">
			<h1 className="text-blue-500 font-bold text-4xl mb-4">Welcome on Vehicool for Developers.</h1>
			<div className="flex flex-1 justify-center items-center">
				<FontAwesomeIcon
					className="text-blue-500 animate-spin"
					icon={ faTire }
					size="6x"
				/>
			</div>
		</div>
	);
};

export default HomePage;
