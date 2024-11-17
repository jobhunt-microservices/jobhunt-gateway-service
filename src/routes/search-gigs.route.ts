import { searchGigsController } from '@gateway/controllers/auth/search-gigs.controller';
import { authMiddleware } from '@gateway/middlewares/auth.middleware';
import express, { Router } from 'express';

class SearchGigsRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/auth/search/gigs/:id', authMiddleware.checkAuthentication, searchGigsController.singleGigSearchById);
    this.router.get('/auth/search/gigs/:from/:size/:type', authMiddleware.checkAuthentication, searchGigsController.gigsSearch);
    return this.router;
  }
}

export const searchGigsRoutes = new SearchGigsRoutes();
