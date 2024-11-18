import { sellerService } from '@gateway/services/api/seller.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class CreateSellerController {
  public async seller(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await sellerService.createSeller(req.body);
    res.status(StatusCodes.CREATED).json({ message: response.data.message, seller: response.data.seller });
  }
}

export const createSellerController = new CreateSellerController();
