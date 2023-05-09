'use client';

import { faKey } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

import Input from '@/components/form/inputs/Input';
import { ApiKey } from '@/context/ApiKey.context';

type DisplayApiKeyBlockProperties = {
	apiKey: ApiKey;
}

const DisplayApiKeyBlock: FC<DisplayApiKeyBlockProperties> = ({ apiKey }) => {

	const apiCreationDate = apiKey.created_at ? new Date(apiKey.created_at) : null;

	return (
		<div>
			<h2 className="text-xl text-blue-500 font-medium mb-4 flex gap-2 items-center"><FontAwesomeIcon icon={ faKey } />My API Key</h2>
			<div className="bg-white p-6 text-gray-900 rounded-md drop-shadow flex items-center gap-8">
				<Input
					defaultValue={ apiKey.api_key }
					label="API Key"
					labelClassName="flex-1 mb-0"
					disabled
				/>
				<p className="flex flex-col self-end">
					<span>Created at:</span>
					<span>{ apiCreationDate ? apiCreationDate.toLocaleDateString() + ' at ' + apiCreationDate.toLocaleTimeString() : null }</span>
				</p>
			</div>
		</div>
	);
};

export default DisplayApiKeyBlock;