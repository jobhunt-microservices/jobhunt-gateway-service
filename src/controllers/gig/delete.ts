import { gigsService } from '@gateway/services/api/gigs.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Delete {
  public async gig(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await gigsService.deleteGig(req.params.gigId, req.params.sellerId);
    res.status(StatusCodes.OK).json({ message: response.data.message });
  }
}
