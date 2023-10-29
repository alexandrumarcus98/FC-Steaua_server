import express, { Router } from 'express';
import authRouter from './auth'
import statusRouter from './status'

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
	}
];

defaultIRoute.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
