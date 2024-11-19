import { BASE_PATH } from '@gateway/constants/path';
import { authMiddleware } from '@gateway/middlewares/auth.middleware';
import { authRoute } from '@gateway/routes/auth.route';
import { currentUserRoutes } from '@gateway/routes/current-user.route';
import { healthRoutes } from '@gateway/routes/health.route';
import { seedRoutes } from '@gateway/routes/seed.route';
import { tokenRoutes } from '@gateway/routes/token.route';
import { Application } from 'express';

export const appRoutes = (app: Application) => {
  app.use('', healthRoutes.routes());

  app.use(BASE_PATH, authRoute.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, tokenRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, seedRoutes.routes());
};
