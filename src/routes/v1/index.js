import express from 'express';
import config from '../../config/config.js';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';
import docsRoute from './docs.route.js';
import studentRouter from './student.route.js';
import officerRouter from './officer.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/',
    route: docsRoute
  },
  {
    path: '/student',
    route: studentRouter
  },
  {
    path: '/officer',
    route: officerRouter
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
