import { signInController } from '@gateway/controllers/auth/signin.auth.controller';
import { signUpController } from '@gateway/controllers/auth/signup.auth.controller';
import express, { Router } from 'express';

class AuthRoutes {
  router: Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', signUpController.create);
    this.router.post('/auth/signin', signInController.read);
    return this.router;
  }
}

export const authRoute = new AuthRoutes();
