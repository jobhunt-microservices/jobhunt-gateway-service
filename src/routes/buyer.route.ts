import { buyerController } from '@gateway/controllers/users/buyer/buyer.controller';
import { authMiddleware } from '@gateway/middlewares/auth.middleware';
import express, { Router } from 'express';

class BuyerRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/buyer/email', authMiddleware.checkAuthentication, buyerController.email);
    this.router.get('/buyer/username', authMiddleware.checkAuthentication, buyerController.currentUsername);
    this.router.get('/buyer/:username', authMiddleware.checkAuthentication, buyerController.username);
    return this.router;
  }
}

export const buyerRoutes: BuyerRoutes = new BuyerRoutes();
