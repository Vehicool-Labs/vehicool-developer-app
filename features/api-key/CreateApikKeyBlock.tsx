'use client';

import { faKey, faPlus, faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

import Button from '@/components/ui/Button';

type CreateApiKeyBlockProperties = {
	onClickCreateApiKey: () => Promise<void>;
	isLoading: boolean,
}

const CreateApiKeyBlock: FC<CreateApiKeyBlockProperties> = ({ onClickCreateApiKey: handleClickCreateApiKey, isLoading }) => {

	return (
		<div>
			<h2 className="text-xl text-blue-500 font-medium mb-4 flex gap-2 items-center"><FontAwesomeIcon icon={ faKey } />My API Key</h2>
			<div className="bg-white p-6 text-gray-900 rounded-md drop-shadow flex flex-col items-center gap-8">
				<p className="text-lg font-medium">You don&apos;t have any API Key yet.</p>
				<p>Please create one to connect your application.</p>
				<Button.Primary
					disabled={ isLoading }
					onClick={ handleClickCreateApiKey }
				>
					{
						isLoading ?
							<FontAwesomeIcon
								className="animate-spin"
								icon={ faSpinnerThird }
							/>
							   :
							<FontAwesomeIcon icon={ faPlus } />
					}
					Create an API Key
				</Button.Primary>
			</div>
		</div>
	);
};

export default CreateApiKeyBlock;