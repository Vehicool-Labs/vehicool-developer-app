'use client';

import { faSave, faAt } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@supabase/supabase-js';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useSupabase } from '@/app/supabase-provider';
import Input from '@/components/form/inputs/Input';
import Button from '@/components/ui/Button';

type AccountUpdateEmailProperties = {
	user: User;
}

type AccountUpdateEmailFormValues = {
	email: string;
	password: string;
}

const AccountUpdateEmailFormSchema = Yup.object({
	email: Yup.string().required('Required.').email('Please enter a valid email address.'),
	password: Yup.string().required('Required.'),
}).required();

const AccountUpdateEmail: FC<AccountUpdateEmailProperties> = ({ user }) => {

	const { supabase } = useSupabase();

	const [ error, setError ] = useState<string | null>(null);
	const [ message, setMessage ] = useState<string | null>(null);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const { register, handleSubmit, reset, formState: { errors } } = useForm<AccountUpdateEmailFormValues>({
		resolver: yupResolver(AccountUpdateEmailFormSchema),
		mode: 'onSubmit', 
	});

	const handleSubmitForm = async (values: AccountUpdateEmailFormValues) => {
		setIsLoading(true);
		setError(null);
		setMessage(null);
		try {
			if (!user.email) {
				setError('Your account must have a valid email to update your password.');
				return;
			}
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email: user.email,
				password: values.password, 
			});
			if (signInError) {
				setError(signInError.message === 'Invalid login credentials' ? 'Invalid password.' : signInError.message);
				return;
			}
			const { error: updateError, data } = await supabase.auth.updateUser({ email: values.email });
			if (updateError) {
				setError(updateError.message);
				return;
			}
			setMessage('Please check your the inbox of the new email address to validate the update.');
			reset();
		} catch (error) {
			console.error(error);
			setError('An error occured.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<h2 className="text-xl text-blue-500 font-medium mb-4 flex gap-2 items-center"><FontAwesomeIcon icon={ faAt } />Update email address</h2>
			<form
				className="drop-shadow bg-white p-6 rounded-md"
				onSubmit={ handleSubmit(handleSubmitForm) }
			>
				<div className="w-1/2">
					<Input
						defaultValue={ user.email }
						label="Current email address"
						type="email"
						disabled
					/>
				</div>
				<div className="w-1/2">
					<Input
						error={ errors.email?.message }
						label="New email address"
						register={ register('email') }
						type="email"
					/>
				</div>
				<div className="w-1/2">
					<Input
						error={ errors.password?.message }
						label="Current password"
						register={ register('password') }
						type="password"
					/>
				</div>
				<div className="flex gap-4 items-center">
					<Button.Primary disabled={ isLoading }>
						<FontAwesomeIcon icon={ faSave } />
						Save
					</Button.Primary>
					{ error ? <p className="text-red-500 font-medium">{ error }</p> : null }
					{ isLoading ? <p className="text-blue-500 font-medium">Loading...</p> : null }
					{ message ? <p className="text-green-500 font-medium">{ message }</p> : null }
				</div>
			</form>
		</div>
	);
};

export default AccountUpdateEmail;