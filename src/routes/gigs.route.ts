import { Create } from '@gateway/controllers/gig/create';
import { Delete } from '@gateway/controllers/gig/delete';
import { Get } from '@gateway/controllers/gig/get';
import { Search } from '@gateway/controllers/gig/search';
import { GigSeed } from '@gateway/controllers/gig/seed';
import { Update } from '@gateway/controllers/gig/update';
import { authMiddleware } from '@gateway/middlewares/auth.middleware';
import express, { Router } from 'express';

class GigsRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/gigs/:gigId', authMiddleware.checkAuthentication, Get.prototype.gigById);
    this.router.get('/gigs/seller/:sellerId', authMiddleware.checkAuthentication, Get.prototype.getSellerGigs);
    this.router.get('/gigs/seller/pause/:sellerId', authMiddleware.checkAuthentication, Get.prototype.getSellerPausedGigs);
    this.router.get('/gigs/search/:from/:size/:type', authMiddleware.checkAuthentication, Search.prototype.gigs);
    this.router.get('/gigs/category/:username', authMiddleware.checkAuthentication, Get.prototype.getGigsByCategory);
    this.router.get('/gigs/top/:username', authMiddleware.checkAuthentication, Get.prototype.getTopRatedGigsByCategory);
    this.router.get('/gigs/similar/:gigId', authMiddleware.checkAuthentication, Get.prototype.getMoreGigsLikeThis);
    this.router.post('/gigs/create', authMiddleware.checkAuthentication, Create.prototype.gig);
    this.router.put('/gigs/:gigId', authMiddleware.checkAuthentication, Update.prototype.gig);
    this.router.put('/gigs/active/:gigId', authMiddleware.checkAuthentication, Update.prototype.gigActive);
    this.router.put('/gigs/seed/:count', authMiddleware.checkAuthentication, GigSeed.prototype.gig);
    this.router.delete('/gigs/:gigId/:sellerId', authMiddleware.checkAuthentication, Delete.prototype.gig);
    return this.router;
  }
}

export const gigsRoutes: GigsRoutes = new GigsRoutes();
