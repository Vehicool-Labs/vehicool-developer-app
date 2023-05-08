import { FC, HTMLAttributeAnchorTarget, ReactNode } from 'react';

type SidebarProperties = {
	brand: {
		title: string;
		href?: string;
		target?: HTMLAttributeAnchorTarget;
		className?: string;
	};
	children: ReactNode;
	className?: string;
};

const Sidebar: FC<SidebarProperties> = ({ brand, children, className = '' }) => {

	return (
		<div className={ `w-[200px] bg-blue-100 p-6 ${ className } flex flex-col items-center` }>
			<a
				className={ `text-2xl font-bold text-blue-500 mb-6 ${ brand.className }` }
				href={ brand.href }
				target={ brand.target || '_self' }
			>{ brand.title }
			</a>
			<div className="self-start w-full flex-1 flex flex-col">
				{ children }
			</div>
		</div>
	);
};

export default Sidebar;