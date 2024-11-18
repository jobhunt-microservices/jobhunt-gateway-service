import { BASE_PATH } from '@gateway/constants/path';
import { authMiddleware } from '@gateway/middlewares/auth.middleware';
import { authRoute } from '@gateway/routes/auth.route';
import { buyerRoutes } from '@gateway/routes/buyer.route';
import { currentUserRoutes } from '@gateway/routes/current-user.route';
import { gigsRoutes } from '@gateway/routes/gigs.route';
import { healthRoutes } from '@gateway/routes/health.route';
import { searchGigsRoutes } from '@gateway/routes/search-gigs.route';
import { seedRoutes } from '@gateway/routes/seed.route';
import { sellerRoutes } from '@gateway/routes/seller.route';
import { tokenRoutes } from '@gateway/routes/token.route';
import { Application } from 'express';

export const appRoutes = (app: Application) => {
  app.use(BASE_PATH, healthRoutes.routes());
  app.use(BASE_PATH, authRoute.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, tokenRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, searchGigsRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, seedRoutes.routes());

  app.use(BASE_PATH, authMiddleware.verifyUser, buyerRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, sellerRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, gigsRoutes.routes());
};
