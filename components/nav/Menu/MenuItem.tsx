import Link from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

type MenuItemProperties = {
	className?: string;
	key?: string | number;
	title?: string;
	icon?: ReactNode;
}

type MenuItemLinkProperties = MenuItemProperties & {
	path: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const MenuItem = ({ className = '', key, path, title, icon, ...rest }: MenuItemLinkProperties) => {
	return (
		<Link
			className={ `flex gap-2 px-4 py-2 w-full items-center rounded-md hover:text-gray-900 hover:bg-blue-300 cursor-pointer ${ className }` }
			href={ path }
			{ ...rest }
		>
			{ icon }
			{ title }
		</Link>
	);
};

export default MenuItem;