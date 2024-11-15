import { config } from '@gateway/config';
import { SERVICE_NAME } from '@gateway/constants';
import { IAuthPayload, NotAuthorizedError } from '@jobhunt-microservices/jobhunt-shared';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

class AuthMiddleware {
  constructor() {}

  public verifyUser(req: Request, _: Response, next: NextFunction) {
    if (!req.session?.jwt) {
      throw new NotAuthorizedError('Token is not available, please login again.', SERVICE_NAME + ' verifyUser() method');
    }
    try {
      const payload = verify(req.session?.jwt, `${config.JWT_TOKEN}`) as IAuthPayload;
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError('Token is not available, please login again.', SERVICE_NAME + ' verifyUser() method');
    }
    next();
  }

  public checkAuthentication(req: Request, _: Response, next: NextFunction) {
    if (!req.currentUser) {
      throw new NotAuthorizedError('Authentication is required to access this route.', SERVICE_NAME + ' checkAuthentication() method');
    }
    next();
  }
}

export const authMiddleware = new AuthMiddleware();
