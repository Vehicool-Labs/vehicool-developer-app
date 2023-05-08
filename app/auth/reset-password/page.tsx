'use client';

import { faPaperPlane } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useSupabase } from '@/app/supabase-provider';
import Input from '@/components/form/inputs/Input';
import Button from '@/components/ui/Button';

type ResetPasswordFormValues = {
	email: string;
	password: string;
}

const ResetPasswordFormSchema = Yup.object({ email: Yup.string().required('Required.').email('Please set a valid email address.') }).required();

const ResetPasswordPage = () => {

	const { supabase } = useSupabase();

	const [ error, setError ] = useState<string | null>(null);
	const [ message, setMessage ] = useState<string | null>(null);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordFormValues>({
		resolver: yupResolver(ResetPasswordFormSchema),
		mode: 'onSubmit', 
	});

	const handleSubmitResetPasswordForm = async (values: ResetPasswordFormValues) => {
		try {
			setIsLoading(true);
			setError(null);
			setMessage(null);
			const { error } = await supabase.auth.resetPasswordForEmail(values.email,{ redirectTo: `${ process.env.NEXT_PUBLIC_APP_URL }/auth/update-password` });
			if (error) {
				setError(error.message);
				return;
			}
			setMessage('Check your inbox to get a new password.');
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
				onSubmit={ handleSubmit(handleSubmitResetPasswordForm) }
			>
				<h2 className="text-xl text-blue-500 font-medium">Vehicool</h2>
				<h1 className="text-2xl text-blue-500 font-bold">Forgotten password</h1>
				<div className="border-b-[1px] border-blue-500 my-6"></div>
				<Input
					error={ errors.email?.message }
					label="Email"
					register={ register('email') }
					type="email"
				/>
				<div className="flex flex-col gap-4 items-center">
					{ error ? <p className="text-red-500 font-medium">{ error }</p> : null }
					{ message ? <p className="text-green-500 font-medium">{ message }</p> : null }
					{ isLoading ? <p className="text-blue-500 font-medium">Loading...</p> : null }
					<Button.Primary
						type="submit"
					>
						<FontAwesomeIcon icon={ faPaperPlane } />
						Request a new password
					</Button.Primary>
					<Link
						className="text-blue-500 hover:text-blue-600 cursor-pointer"
						href="/auth/signin"
					>Back to sign in form
					</Link>
				</div>
			</form>
		</div>
	);
};

export default ResetPasswordPage;