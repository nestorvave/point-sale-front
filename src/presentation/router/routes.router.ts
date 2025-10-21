import { CiGrid41 } from 'react-icons/ci';
import App from '../../App';
import type { IMenuList } from '../interfaces/menu-list.interface';

export const ROUTE_LIST: IMenuList[] = [
	{
		title: 'Configurador',
		link: '/',
		Component: App,
		icon: CiGrid41,
		submenu: [
			{
				title: 'Escalas de evaluación',
				link: '/',
				Component: App,
				icon: CiGrid41,
				hideMenu: true,
			},
		],
	},
	{
		title: 'trabajo',
		link: '/',
		Component: App,
		icon: CiGrid41,
		submenu: [
			{
				title: 'Trabajo rtes',
				link: '/',
				Component: App,
				icon: CiGrid41,
				hideMenu: true,
			},
		],
	},
];

export default ROUTE_LIST;
