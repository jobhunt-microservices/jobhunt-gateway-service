import { SERVICE_NAME } from '@gateway/constants';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class HealthController {
  public health(_: Request, res: Response) {
    res.status(StatusCodes.OK).send(SERVICE_NAME + ' is healthy');
  }
}
