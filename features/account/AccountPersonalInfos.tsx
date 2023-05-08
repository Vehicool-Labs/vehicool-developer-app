'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@supabase/supabase-js';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useSupabase } from '@/app/supabase-provider';
import Input from '@/components/form/inputs/Input';
import Button from '@/components/ui/Button';

type AccountPersonalInfosProperties = {
	user: User;
}

type AccountPersonalInfosFormValues = {
	firstname: string;
	lastname: string;
	company: string;
}

const AccountPersonalInfosFormSchema = Yup.object({
	firstname: Yup.string().required('Required.'),
	lastname: Yup.string().required('Required.'),
	company: Yup.string(),
}).required();

const AccountPersonalInfos: FC<AccountPersonalInfosProperties> = ({ user }) => {

	const { supabase } = useSupabase();

	const [ error, setError ] = useState<string | null>(null);
	const [ message, setMessage ] = useState<string | null>(null);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const { register, handleSubmit, watch, formState: { errors } } = useForm<AccountPersonalInfosFormValues>({
		defaultValues: {
			firstname: user.user_metadata.firstname || '',
			lastname: user.user_metadata.lastname || '',
			company: user.user_metadata.company || '',
		},
		resolver: yupResolver(AccountPersonalInfosFormSchema),
		mode: 'onSubmit', 
	});

	const handleSubmitForm = async (values: AccountPersonalInfosFormValues) => {
		setIsLoading(true);
		setError(null);
		try {
			const { error: updateError, data } = await supabase.auth.updateUser({ data: { ...values } });
			if (updateError) {
				setError(updateError.message);
				return;
			}
			const { error: refreshError }= await supabase.auth.refreshSession();
			if (refreshError) {
				setError(`Saved successfully but there was an error when refreshing your client data: ${ refreshError.message }`);
				return;
			}
			setMessage('Saved successfully.');
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
			<h2 className="text-xl text-blue-500 font-medium mb-4">Personal informations</h2>
			<form
				className="drop-shadow bg-white p-6 rounded-md"
				onSubmit={ handleSubmit(handleSubmitForm) }
			>
				<div className="grid grid-cols-2 gap-4 w-1/2">
					<div className="col-start-1">
						<Input
							error={ errors.firstname?.message }
							label="Firstname"
							register={ register('firstname') }
						/>
					</div>
					<div className="col-start-2">
						<Input
							error={ errors.lastname?.message }
							label="Lastname"
							register={ register('lastname') }
						/>
					</div>
				</div>
				<div className="w-1/2">
					<Input
						error={ errors.company?.message }
						label="Company"
						register={ register('company') }
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

export default AccountPersonalInfos;