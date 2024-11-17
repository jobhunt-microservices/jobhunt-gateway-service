import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class SearchGigsController {
  public async singleGigSearchById(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.singleGigSearchById(req.params.id);
    res.status(StatusCodes.OK).json({ message: response.data.message, data: response.data.data });
  }

  public async gigsSearch(req: Request, res: Response): Promise<void> {
    const { from, size, type } = req.params;
    let query = '';
    const objList = Object.entries(req.query);
    const lastItemIndex = objList.length - 1;
    objList.forEach(([key, value], index) => {
      query += `${key}=${value}${index !== lastItemIndex ? '&' : ''}`;
    });
    const response: AxiosResponse = await authService.gigsSearch(`${query}`, from, size, type);
    res.status(StatusCodes.OK).json({ message: response.data.message, total: response.data.total, data: response.data.data });
  }
}

export const searchGigsController = new SearchGigsController();
