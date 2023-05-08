'use client';

import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import AccountPersonalInfos from '@/features/account/AccountPersonalInfos';
import AccountUpdateEmail from '@/features/account/AccountUpdateEmail';
import AccountUpdatePassword from '@/features/account/AccountUpdatePassword';

import { useSupabase } from '../supabase-provider';

const AccountPage = () => {

	const { supabase } = useSupabase();
	const [ user, setUser ] = useState<User | null>(null);

	useEffect(() => {
		supabase.auth.getUser()
			.then(({ data, error }) => {
				if (error || !data.user) {
					console.error(error);
					setUser(null);
				}
				setUser(data.user);
			});
	}, [ supabase ]);

	return (
		<div className="max-w-[1280px]">
			<h1 className="text-2xl text-blue-500 font-bold mb-8">Account</h1>
			<div className="flex flex-col gap-8">
				{ user ? <AccountPersonalInfos user={ user } /> : null }
				{ user ? <AccountUpdateEmail user={ user } /> : null }
				{ user ? <AccountUpdatePassword user={ user } /> : null }
			</div>
		</div>
	);
};

export default AccountPage;