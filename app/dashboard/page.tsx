import DashboardApiKeyAlert from '@/features/dashboard/DashboardApiKeyAlert';

const DashboardPage = () => {

	return (
		<div className="max-w-[1280px]">
			<h1 className="text-2xl text-blue-500 font-bold mb-8">Dashboard</h1>
			<DashboardApiKeyAlert />
		</div>
	);
};

export default DashboardPage;