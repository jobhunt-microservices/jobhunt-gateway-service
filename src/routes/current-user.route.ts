import { currentUserController } from '@gateway/controllers/auth/current-user.controller';
import express, { Router } from 'express';

class CurrentUserRoutes {
  router: Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/auth/current-user', currentUserController.read);
    this.router.post('/auth/resend-email', currentUserController.resendEmail);
    this.router.get('/auth/logged-in-user', currentUserController.getLoggedInUsers);
    this.router.delete('/auth/logged-in-user', currentUserController.removeLoggedInUsers);

    return this.router;
  }
}

export const currentUserRoutes = new CurrentUserRoutes();
