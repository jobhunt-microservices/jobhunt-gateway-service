import { createSellerController } from '@gateway/controllers/users/seller/create.controller';
import { getSellerController } from '@gateway/controllers/users/seller/get.controller';
import { seedSellerController } from '@gateway/controllers/users/seller/seed.controller';
import { updateSellerController } from '@gateway/controllers/users/seller/update.controller';
import { authMiddleware } from '@gateway/middlewares/auth.middleware';
import express, { Router } from 'express';

class SellerRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/seller/id/:sellerId', authMiddleware.checkAuthentication, getSellerController.id);
    this.router.get('/seller/username/:username', authMiddleware.checkAuthentication, getSellerController.username);
    this.router.get('/seller/random/:size', authMiddleware.checkAuthentication, getSellerController.random);
    this.router.post('/seller/create', authMiddleware.checkAuthentication, createSellerController.seller);
    this.router.put('/seller/:sellerId', authMiddleware.checkAuthentication, updateSellerController.seller);
    this.router.put('/seller/seed/:count', authMiddleware.checkAuthentication, seedSellerController.seller);

    return this.router;
  }
}

export const sellerRoutes: SellerRoutes = new SellerRoutes();
