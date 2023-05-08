import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';


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
				{ items.map(item => (
					<li key={ item.key }>
						<Link
							className={ `flex gap-2 px-4 py-2 w-full rounded-md ${ selectedItem === item.key ? 'text-gray-900 bg-blue-300' : 'text-gray-800' } hover:text-gray-900 hover:bg-blue-300 ${ item.className }` }
							href={ item.path }
							onMouseLeave={ handleLeaveItem }
							onMouseOver={ handleHoverItem }
						>
							{ item.icon }
							{ item.title }
						</Link>
					</li>
				)) }
			</ul>
		</nav>
	);
};

export default Menu;