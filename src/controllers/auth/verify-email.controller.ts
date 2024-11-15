import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class VerifyEmailController {
  public async update(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.verifyEmail(req.body);
    const { message } = response.data;
    res.status(StatusCodes.OK).json({ message });
  }
}

export const verifyEmailController = new VerifyEmailController();
