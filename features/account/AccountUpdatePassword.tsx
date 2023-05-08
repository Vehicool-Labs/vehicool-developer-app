'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@supabase/supabase-js';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useSupabase } from '@/app/supabase-provider';
import Input from '@/components/form/inputs/Input';
import Button from '@/components/ui/Button';

type AccountUpdatePasswordProperties = {
	user: User;
}

type UpdatePasswordFormValues = {
	password: string;
	newPassword: string;
	newPasswordConfirm: string;
}

const UpdatePasswordFormSchema = Yup.object({
	password: Yup.string().required('Required.'),
	newPassword: Yup.string().required('Required.').min(8, 'Should contain at least 8 characters.').notOneOf([ Yup.ref('password') ], 'Your new password must be different from the previous one.'),
	newPasswordConfirm: Yup.string().required('Required').oneOf([ Yup.ref('newPassword') ], 'Passwords must match.'),
}).required();

const AccountUpdatePassword: FC<AccountUpdatePasswordProperties> = ({ user }) => {

	const { supabase } = useSupabase();

	const [ error, setError ] = useState<string | null>(null);
	const [ message, setMessage ] = useState<string | null>(null);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdatePasswordFormValues>({
		resolver: yupResolver(UpdatePasswordFormSchema),
		mode: 'onSubmit', 
	});

	const handleSubmitForm = async (values: UpdatePasswordFormValues) => {
		setIsLoading(true);
		setError(null);
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
			const { error: updateError } = await supabase.auth.updateUser({ password: values.newPassword });
			if (updateError) {
				setError(updateError.message);
				return;
			}
			setMessage('Saved successfully.');
			reset();
			setTimeout(() => {
				setMessage(null);
			}, 3000);
		} catch (error) {
			console.error(error);
			setError('An error occured.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<h2 className="text-xl text-blue-500 font-medium mb-4">Update password</h2>
			<form
				className="drop-shadow bg-white p-6 rounded-md"
				onSubmit={ handleSubmit(handleSubmitForm) }
			>
				<div className="w-1/2">
					<Input
						error={ errors.password?.message }
						label="Current password"
						register={ register('password') }
						type="password"
					/>
				</div>
				<div className="w-1/2">
					<Input
						error={ errors.newPassword?.message }
						label="New password"
						register={ register('newPassword') }
						type="password"
					/>
				</div>
				<div className="w-1/2">
					<Input
						error={ errors.newPasswordConfirm?.message }
						label="Confirm new password"
						register={ register('newPasswordConfirm') }
						type="password"
					/>
				</div>
				<div className="flex gap-4 items-center">
					<Button.Primary disabled={ isLoading }>
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

export default AccountUpdatePassword;