'use client';

import { faSave } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useSupabase } from '@/app/supabase-provider';
import Input from '@/components/form/inputs/Input';
import Button from '@/components/ui/Button';

type UpdatePasswordFormValues = {
	password: string;
	passwordConfirm: string;
}

const UpdatePasswordFormSchema = Yup.object({
	password: Yup.string().required('Required.').min(8, 'Should contain at least 8 characters.'),
	passwordConfirm: Yup.string().required('Required').oneOf([ Yup.ref('password') ], 'Passwords must match.'),
}).required();

const UpdatePasswordPage = () => {

	const router = useRouter();
	const { supabase } = useSupabase();

	const [ error, setError ] = useState<string | null>();
	const [ isLoading, setIsLoading ] = useState<boolean>(false);


	const { register, handleSubmit, watch, formState: { errors } } = useForm<UpdatePasswordFormValues>({
		resolver: yupResolver(UpdatePasswordFormSchema),
		mode: 'onSubmit', 
	});

	const handleSubmitUpdatePasswordForm = async (values: UpdatePasswordFormValues) => {
		try {
			setIsLoading(true);
			setError(null);
			const { error } = await supabase.auth.updateUser({ password: values.password });
			if (error) {
				setError(error.message);
				return;
			}
			router.push('/');
		} catch (error) {
			console.error(error);
			setError('An error occured.');
		} finally {
			setIsLoading(false);
		}
	};


	return (
		<div className="h-full flex justify-center items-center">
			<form
				className="drop-shadow bg-white p-6 rounded-md w-96"
				onSubmit={ handleSubmit(handleSubmitUpdatePasswordForm) }
			>
				<h2 className="text-xl text-blue-500 font-medium">Vehicool</h2>
				<h1 className="text-2xl text-blue-500 font-bold">Set a new password</h1>
				<div className="border-b-[1px] border-blue-500 my-6"></div>
				<Input
					error={ errors.password?.message }
					label="New password"
					register={ register('password') }
					type="password"
				/>
				<Input
					error={ errors.passwordConfirm?.message }
					label="Confirm new password"
					register={ register('passwordConfirm') }
					type="password"
				/>
				<div className="flex flex-col gap-4 items-center">
					{ error ? <p className="text-red-500 font-medium">{ error }</p> : null }
					{ isLoading ? <p className="text-blue-500 font-medium">Loading...</p> : null }
					<Button.Primary
						type="submit"
					>
						<FontAwesomeIcon icon={ faSave } />
						Save
					</Button.Primary>
					<Link
						className="text-blue-500 hover:text-blue-600 cursor-pointer"
						href="/auth/signup"
					>Create an account
					</Link>
				</div>
			</form>
		</div>
	);
};

export default UpdatePasswordPage;