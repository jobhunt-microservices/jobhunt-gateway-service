import { BASE_PATH } from '@gateway/constants/path';
import { authRoute } from '@gateway/routes/auth.route';
import { healthRoutes } from '@gateway/routes/health.route';
import { Application } from 'express';

export const appRoutes = (app: Application) => {
  app.use(BASE_PATH, healthRoutes.routes());
  app.use(BASE_PATH, authRoute.routes());
};
