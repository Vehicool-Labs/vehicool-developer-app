import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';

import MenuItem from './MenuItem';


type MenuProperties = {
	title?: string;
	items: {
		title: string;
		icon?: ReactNode;
		key: string | number;
		path: string;
		className?: string;
	}[];
	className?: string;
}

const Menu: FC<MenuProperties> = ({ title = '', items = [], className = '' }) => {

	const pathname = usePathname();
	const [ pathElement1 ] = pathname.split('/').filter(element => element);
	const [ selectedItem, setSelectedItem ] = useState<string | null>(pathElement1);

	const handleHoverItem = () => {
		setSelectedItem(null);
	};

	const handleLeaveItem = () => {
		setSelectedItem(pathElement1);
	};

	return (
		<nav className={ `${ className }` }>
			{ title ? <p className="text-blue-400 text-xs uppercase mb-2">{ title }</p> : null }
			<ul>
				{ items.map(({ key, path, title: itemTitle, icon, className: itemClassName = '' }) => (
					<li key={ key }>
						<MenuItem
							className={ `${ selectedItem === key ? 'text-gray-900 !bg-blue-300' : 'text-gray-800' } hover:text-gray-900 hover:bg-blue-300 ${ itemClassName }` }
							icon={ icon }
							path={ path }
							title={ itemTitle }
							onMouseLeave={ handleLeaveItem }
							onMouseOver={ handleHoverItem }
						/>
					</li>
				)) }
			</ul>
		</nav>
	);
};

export default Menu;