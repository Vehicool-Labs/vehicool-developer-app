'use client';

import { faKey, faPlus } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Button';
import { useApiKeyContext } from '@/context/ApiKey.context';

const DashboardApiKeyAlert = () => {

	const router = useRouter();
	const { apiKey } = useApiKeyContext();

	const handleClickCreateAPIKey = () => router.push('/api-key');

	return (
		!apiKey ?
			(
				<div className="bg-blue-100 p-6 flex items-center justify-between text-blue-500 rounded-md drop-shadow">
					<div className="flex gap-4 items-center text-medium text-lg">
						<FontAwesomeIcon icon={ faKey } />
						<p>You need an API Key to connect your application.</p>
					</div>
					<Button.Primary onClick={ handleClickCreateAPIKey }><FontAwesomeIcon icon={ faPlus } />Create an API Key</Button.Primary>
				</div>
			)
			: null
			
	);
};

export default DashboardApiKeyAlert;