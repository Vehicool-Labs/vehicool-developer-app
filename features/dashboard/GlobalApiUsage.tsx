'use client';

import { faTachometerAltSlow } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useApiKeyContext } from '@/context/ApiKey.context';

const GlobalApiUsage = () => {

	const { apiKey } = useApiKeyContext();

	return (
		<div className="bg-white p-6 text-gray-900 rounded-md drop-shadow w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
			<h3 className="font-medium text-xl mb-4 flex items-center gap-2"><FontAwesomeIcon icon={ faTachometerAltSlow } /> API Usage</h3>
			<div className="items-center text-medium flex gap-1">
				<p className="text-xl font-medium text-blue-500">{ apiKey?.global_requests_count || 0 }</p>
				<p>requests</p>
			</div>
		</div>
			
			
	);
};

export default GlobalApiUsage;