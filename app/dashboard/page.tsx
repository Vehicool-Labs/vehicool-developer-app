import DashboardApiKeyAlert from '@/features/dashboard/DashboardApiKeyAlert';
import GlobalApiUsage from '@/features/dashboard/GlobalApiUsage';

const DashboardPage = () => {

	return (
		<div className="max-w-[1280px]">
			<h1 className="text-2xl text-blue-500 font-bold mb-8">Dashboard</h1>
			<div className="flex gap-4 flex-col">
				<DashboardApiKeyAlert />
				<div className="flex gap-4">
					<GlobalApiUsage />
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;