import { seedController } from '@gateway/controllers/auth/seed.controller';
import express, { Router } from 'express';

class SeedRoutes {
  router: Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.put('/auth/seed/:count', seedController.createSeedData);
    return this.router;
  }
}

export const seedRoutes = new SeedRoutes();
