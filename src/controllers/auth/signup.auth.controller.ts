import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class SignUpController {
  public async create(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.signup(req.body);
    const { message, token } = response.data;
    req.session = { jwt: token };
    res.status(StatusCodes.CREATED).json({ message });
  }
}

export const signUpController = new SignUpController();
