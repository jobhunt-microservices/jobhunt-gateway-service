import { gigsService } from '@gateway/services/api/gigs.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Update {
  public async gig(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await gigsService.updateGig(req.params.gigId, req.body);
    res.status(StatusCodes.OK).json({ message: response.data.message, gig: response.data.gig });
  }

  public async gigActive(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await gigsService.updateActiveGigProp(req.params.gigId, req.body.active);
    res.status(StatusCodes.OK).json({ message: response.data.message, gig: response.data.gig });
  }
}
