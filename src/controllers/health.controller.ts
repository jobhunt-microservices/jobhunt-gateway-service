import { SERVICE_NAME } from '@gateway/constants';
import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class HealthController {
  public health(_: Request, res: Response) {
    res.status(StatusCodes.OK).send(SERVICE_NAME + ' is healthy');
  }
  public async healthAuth(_req: Request, res: Response) {
    const response: AxiosResponse = await authService.axiosAuthInstance.get('/auth-health');
    res.status(StatusCodes.OK).json(response.data);
  }
}
export const healthController = new HealthController();
