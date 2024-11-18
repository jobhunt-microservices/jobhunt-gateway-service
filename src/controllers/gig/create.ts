import { gigsService } from '@gateway/services/api/gigs.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Create {
  public async gig(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await gigsService.createGig(req.body);
    res.status(StatusCodes.CREATED).json({ message: response.data.message, gig: response.data.gig });
  }
}
