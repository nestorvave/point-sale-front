
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './protected.router';
import ROUTE_LIST from './routes.router';
import type { IMenuList } from '../interfaces/menu-list.interface';


export const Router = () => {
	const routes: Array<{
		component: () => JSX.Element;
		link: string;
		breadcrumbsHidden?: boolean;
	}> = [];

	const getRoutes = (
		menu: IMenuList[],
		path?: string
	): Array<{
		component: () => JSX.Element;
		link: string;
		breadcrumbsHidden?: boolean;
	}> => {
		menu.forEach((r) => {
			if (r.Component) {
				routes.push({
					component: r.Component,
					link: (path || '') + r.link + (r.parameter || ''),
					breadcrumbsHidden: r.breadcrumbsHidden,
				});
				if (r.parameter) {
					routes.push({
						component: r.Component,
						link: (path || '') + r.link,
						breadcrumbsHidden: r.breadcrumbsHidden,
					});
				}
			}
			if (r.submenu) {
				return getRoutes(r.submenu, (path || '') + r.link);
			}
		});
		return routes;
	};

	return (
		<>
			<Routes>
				<Route path="*" element={<Navigate to={'/'} />} />
				{getRoutes(ROUTE_LIST).map((routes, i) => (
					<Route
						key={i}
						path={routes.link}
						element={<ProtectedRoute component={routes.component} />}
					/>
				))}
			</Routes>
		</>
	);
};
