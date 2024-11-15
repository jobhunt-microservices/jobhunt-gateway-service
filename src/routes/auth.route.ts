import { authController } from '@gateway/controllers/auth/auth.controller';
import { verifyEmailController } from '@gateway/controllers/auth/verify-email.controller';
import express, { Router } from 'express';

class AuthRoutes {
  router: Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', authController.create);
    this.router.post('/auth/signin', authController.read);
    this.router.post('/auth/verify-email', verifyEmailController.update);

    return this.router;
  }
}

export const authRoute = new AuthRoutes();
