import { gigsService } from '@gateway/services/api/gigs.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Get {
  public async gigById(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await gigsService.getGigById(req.params.gigId);
    res.status(StatusCodes.OK).json({ message: response.data.message, gig: response.data.gig });
  }

  public async getSellerGigs(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await gigsService.getSellerGigs(req.params.sellerId);
    res.status(StatusCodes.OK).json({ message: response.data.message, gigs: response.data.gigs });
  }

  public async getSellerPausedGigs(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await gigsService.getSellerPausedGigs(req.params.sellerId);
    res.status(StatusCodes.OK).json({ message: response.data.message, gigs: response.data.gigs });
  }

  public async getGigsByCategory(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await gigsService.getGigsByCategory(req.params.username);
    res.status(StatusCodes.OK).json({ message: response.data.message, gigs: response.data.gigs });
  }

  public async getMoreGigsLikeThis(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await gigsService.getMoreGigsLikeThis(req.params.gigId);
    res.status(StatusCodes.OK).json({ message: response.data.message, gigs: response.data.gigs });
  }

  public async getTopRatedGigsByCategory(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await gigsService.getTopRatedGigsByCategory(req.params.username);
    res.status(StatusCodes.OK).json({ message: response.data.message, gigs: response.data.gigs });
  }
}
