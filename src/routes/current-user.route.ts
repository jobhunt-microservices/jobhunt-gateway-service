import { currentUserController } from '@gateway/controllers/auth/current-user.controller';
import { authMiddleware } from '@gateway/middlewares/auth.middleware';
import express, { Router } from 'express';

class CurrentUserRoutes {
  router: Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/auth/current-user', authMiddleware.checkAuthentication, currentUserController.read);
    this.router.post('/auth/resend-email', authMiddleware.checkAuthentication, currentUserController.resendEmail);

    return this.router;
  }
}

export const currentUserRoutes = new CurrentUserRoutes();
