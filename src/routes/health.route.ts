import { healthController } from '@gateway/controllers/health.controller';
import express, { Router } from 'express';

class HealthRoutes {
  router: Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/gateway-health', healthController.health);
    this.router.get('/auth/auth-health', healthController.healthAuth);
    return this.router;
  }
}

export const healthRoutes = new HealthRoutes();
