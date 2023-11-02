import express, { Router } from 'express';
import authRouter from './auth'
import statusRouter from './status'
import membruRouter from './membru'

const router: Router = express.Router();

interface IRoute {
	path: string;
	route: Router;
}

const defaultIRoute: IRoute[] = [
	{
		path: '/auth',
		route: authRouter,
	}, {
		path: '/status',
		route: statusRouter
	}, {
		path: '/membru',
		route: membruRouter
	}
];

defaultIRoute.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
