import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class SignInController {
  public async read(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.signin(req.body);
    const { message, token } = response.data;
    req.session = { jwt: token };
    res.status(StatusCodes.OK).json({ message });
  }
}

export const signInController = new SignInController();
