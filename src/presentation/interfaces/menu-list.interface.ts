import type { IconType } from 'react-icons';

export interface IMenuList {
	icon?: IconType;
	title: string;
	submenu?: IMenuList[];
	link: string;
	Component?: () => JSX.Element;
	noProtected?: boolean;
	hideMenu?: boolean;
	ignoreToken?: boolean;
	parameter?: string;
	breadcrumbsHidden?: boolean;
}
