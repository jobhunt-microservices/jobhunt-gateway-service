import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class SeedController {
  public async createSeedData(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.createSeedData(req.params.count as string);
    const { message } = response.data;
    res.status(StatusCodes.OK).json({ message });
  }
}

export const seedController = new SeedController();
