import { BASE_PATH } from '@gateway/constants/path';
import { authRoute } from '@gateway/routes/auth.route';
import { currentUserRoutes } from '@gateway/routes/current-user.route';
import { healthRoutes } from '@gateway/routes/health.route';
import { Application } from 'express';
import { authMiddleware } from './middlewares/auth.middleware';
import { tokenRoutes } from './routes/token.route';

export const appRoutes = (app: Application) => {
  app.use(BASE_PATH, healthRoutes.routes());
  app.use(BASE_PATH, authRoute.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
  app.use(BASE_PATH, tokenRoutes.routes());
};
