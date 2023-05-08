'use client';

import { Session } from '@supabase/supabase-js';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useSupabase } from '@/app/supabase-provider';
import Sidebar from '@/components/layout/Sidebar';
import Menu from '@/components/nav/Menu';

import Button from '../ui/Button';

const MainLayout = ({ children }: {
	children: React.ReactNode
  }) => {

	const { supabase } = useSupabase();
	const [ session, setSession ] = useState<Session | null>(null);
	const router = useRouter();
	const pathname = usePathname();
	const [ pathElement1 ] = pathname.split('/').filter(element => element);

	useEffect(() => {
		supabase.auth.getSession()
			.then(({ data, error }) => {
				if (error || !data.session) {
					console.error(error);
					setSession(null);
				}
				setSession(data.session);
			});
	}, [ supabase ]);

	const handleSignout = async () => {
		try {
			const { error }= await supabase.auth.signOut();
			if (error) {
				throw error;
			}
			router.push('/');
		} catch (error) {
			console.error(error);
		}
	};

	  return (
		<main className="flex h-full">
			{
				session && pathElement1 && pathElement1 !== 'auth' ?
					<Sidebar
						brand={ {
							title: 'Vehicool',
							href: '/',
							tag: 'For developers.',
						} }
					>
						<Menu
							items={ [
								{
									title: 'Dashboard',
									path: '/dashboard',
									key: 'dashboard',
								},
								{
									title: 'Account',
									path: '/account',
									key: 'account',
								},
							] }
							title="Navigation"
						/>
						<Button.Danger
							className="w-full mt-auto"
							onClick={ handleSignout }
						>
							Sign out
						</Button.Danger>
					</Sidebar>
			  : null
			}
			<div className="p-6 flex-1">
				{ children }
			</div>
		</main>
	  );
};
  
export default MainLayout;