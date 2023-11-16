import express, { Router } from "express";
import authRegister from "./auth/inregistrare";
import authLogare from "./auth/logare";
import statusRouter from "./status";
import fizicRouter from "./fizic";
import juridicRouter from "./juridic";
import sharedRouter from "./shared";
const router: Router = express.Router();
interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: "/auth/inregistrare",
    route: authRegister,
  },
  {
    path: "/auth/logare",
    route: authLogare,
  },
  {
    path: "/status",
    route: statusRouter,
  },
  {
    path: "/fizic",
    route: fizicRouter,
  },
  {
    path: "/juridic",
    route: juridicRouter,
  },
  {
    path: "/shared",
    route: sharedRouter,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
