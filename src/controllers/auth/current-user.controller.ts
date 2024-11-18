import { gatewayCache } from '@gateway/redis/gateway.cache';
import { socketIO } from '@gateway/server';
import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class CurrentUserController {
  public async read(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.getCurrentUser();
    res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
  }

  public async resendEmail(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.resendEmail();
    res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
  }

  public async getLoggedInUsers(req: Request, res: Response) {
    const response: string[] = await gatewayCache.getLoggedInUsersFromCache('loggedInUsers');
    socketIO.emit('online', response);
    res.status(StatusCodes.OK).json({ message: 'User is online' });
  }

  public async removeLoggedInUsers(req: Request, res: Response) {
    const response: string[] = await gatewayCache.removeLoggedInUserFromCache('loggedInUsers', req.currentUser?.username!);
    socketIO.emit('online', response);
    res.status(StatusCodes.OK).json({ message: 'User is offline' });
  }
}

export const currentUserController = new CurrentUserController();
