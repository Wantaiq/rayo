import { Router } from 'express';
import authRoute from './auth.route';
import foodRoute from './food.route';

const router = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/food',
    route: foodRoute,
  },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
