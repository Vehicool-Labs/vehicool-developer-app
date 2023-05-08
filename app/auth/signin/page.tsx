'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useSupabase } from '@/app/supabase-provider';
import Input from '@/components/form/inputs/Input';
import Button from '@/components/ui/Button';

type SigninFormValues = {
	email: string;
	password: string;
}

const SigninFormSchema = Yup.object({
	email: Yup.string().required('Required.').email('Please set a valid email address.'),
	password: Yup.string().required('Required.'),
}).required();

const SigninPage = () => {

	const router = useRouter();
	const { supabase } = useSupabase();

	const [ error, setError ] = useState<string | null>();

	const { register, handleSubmit, watch, formState: { errors } } = useForm<SigninFormValues>({
		resolver: yupResolver(SigninFormSchema),
		mode: 'onSubmit', 
	});

	const handleSubmitSigninForm = async (values: SigninFormValues) => {
		try {
			setError(null);
			const { data, error } = await supabase.auth.signInWithPassword({
				email: values.email,
				password: values.password,
			});
			if (error) {
				setError(error.message);
				return;
			}
			router.push('/');
		} catch (error) {
			console.error(error);
			setError('An error occured.');
		}
	};


	return (
		<div className="h-full flex justify-center items-center">
			<form
				className="drop-shadow bg-white p-6 rounded-md w-96"
				onSubmit={ handleSubmit(handleSubmitSigninForm) }
			>
				<h2 className="text-xl text-blue-500 font-medium">Vehicool</h2>
				<h1 className="text-2xl text-blue-500 font-bold">Sign in</h1>
				<div className="border-b-[1px] border-blue-500 my-6"></div>
				<Input
					error={ errors.email?.message }
					label="Email"
					register={ register('email') }
					type="email"
				/>
				<Input
					error={ errors.password?.message }
					label="Password"
					register={ register('password') }
					type="password"
				/>
				<div className="flex flex-col gap-4 items-center">
					{ error ? <p className="text-red-500 font-medium">{ error }</p> : null }
					<Button.Primary
						type="submit"
					>
						Sign in
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

export default SigninPage;