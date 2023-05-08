import { FC, HTMLAttributeAnchorTarget, ReactNode } from 'react';

type SidebarProperties = {
	brand: {
		title: string;
		href?: string;
		target?: HTMLAttributeAnchorTarget;
		className?: string;
		tag?: string;
	};
	children: ReactNode;
	className?: string;
};

const Sidebar: FC<SidebarProperties> = ({ brand, children, className = '' }) => {

	return (
		<div className={ `w-[200px] bg-blue-100 p-6 ${ className } flex flex-col items-center` }>
			<a
				className={ `flex flex-col mb-6 gap-0 ${ brand.className || '' }` }
				href={ brand.href }
				target={ brand.target || '_self' }
			>
				<span className="text-3xl leading-7 font-bold text-blue-500">
					{ brand.title }
				</span>
				{
					brand.tag ?
						<span className="text-sm font-medium pl-1 text-blue-400">
							{ brand.tag }
						</span>
				 	: null
				}
			</a>
			<div className="self-start w-full flex-1 flex flex-col">
				{ children }
			</div>
		</div>
	);
};

export default Sidebar;