'use client';

import { Session } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useSupabase } from '@/app/supabase-provider';
import Sidebar from '@/components/layout/Sidebar';
import Menu from '@/components/nav/Menu';

const MainLayout = ({ children }: {
	children: React.ReactNode
  }) => {

	const { supabase } = useSupabase();
	const [ session, setSession ] = useState<Session | null>(null);
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

	  return (
		<main className="flex h-full">
			{
				session && pathElement1 && pathElement1 !== 'auth' ?
					<Sidebar
						brand={ {
							title: 'Vehicool',
							href: '/',
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