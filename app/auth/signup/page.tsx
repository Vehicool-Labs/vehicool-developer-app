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

type SignupFormValues = {
	firstname: string;
	lastname: string;
	company: string;
	email: string;
	password: string;
	passwordConfirm: string;
}

const SignupFormSchema = Yup.object({
	firstname: Yup.string().required('Required.'),
	lastname: Yup.string().required('Required.'),
	company: Yup.string(),
	email: Yup.string().required('Required.').email('Please set a valid email address.'),
	password: Yup.string().required('Required.').min(8, 'Should contain at least 8 characters.'),
	passwordConfirm: Yup.string().required('Required').oneOf([ Yup.ref('password') ], 'Passwords must match.'),
}).required();

const SignupPage = () => {

	const router = useRouter();
	const { supabase } = useSupabase();

	const [ error, setError ] = useState<string | null>(null);
	const [ message, setMessage ] = useState<string | null>(null);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormValues>({
		resolver: yupResolver(SignupFormSchema),
		mode: 'onSubmit', 
	});

	const handleSubmitSignupForm = async (values: SignupFormValues) => {
		try {
			setMessage(null);
			setError(null);
			setIsLoading(true);
			const { data, error } = await supabase.auth.signUp({
				email: values.email,
				password: values.password,
				options: {
					data: {
						firstname: values.firstname,
						lastname: values.lastname,
						company: values.company || null,
					},
				},
			});
			if (error) {
				console.error(error);
				setError(error.message);
				return;
			} else if (data.user?.identities?.length === 0) {
				setError('User already registered.');
			} else {
				setMessage('Success! Please check your inbox.');
			}
			// router.push('/');
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
				className="drop-shadow bg-white p-6 rounded-md"
				onSubmit={ handleSubmit(handleSubmitSignupForm) }
			>
				<h2 className="text-xl text-blue-500 font-medium">Vehicool</h2>
				<h1 className="text-2xl text-blue-500 font-bold">Sign up</h1>
				<div className="border-b-[1px] border-blue-500 my-6"></div>
				<div className="flex gap-4">
					<Input
						error={ errors.firstname?.message }
						label="Firstname"
						register={ register('firstname', { required: true }) }
					/>
					<Input
						error={ errors.lastname?.message }
						label="Lastname"
						register={ register('lastname', { required: true }) }
					/>
				</div>
				<Input
					error={ errors.company?.message }
					label="Company"
					register={ register('company') }
				/>
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
				<Input
					error={ errors.passwordConfirm?.message }
					label="Confirm password"
					register={ register('passwordConfirm') }
					type="password"
				/>
				<div className="flex flex-col gap-4 items-center">
					{ isLoading ? <p className="text-blue-500 font-medium">Loading...</p> : null }
					{ error ? <p className="text-red-500 font-medium">{ error }</p> : null }
					{ message ? <p className="text-green-500 font-medium">{ message }</p> : null }
					<Button.Primary
						type="submit"
					>
						Sign up
					</Button.Primary>
					<Link
						className="text-blue-500 hover:text-blue-600 cursor-pointer"
						href="/auth/signup"
					>Already signed up ? Sign in
					</Link>
				</div>
			</form>
		</div>
	);
};

export default SignupPage;