import { gigsService } from '@gateway/services/api/gigs.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Search {
  public async gigs(req: Request, res: Response): Promise<void> {
    const { from, size, type } = req.params;
    let query = '';
    const objList = Object.entries(req.query);
    const lastItemIndex = objList.length - 1;
    objList.forEach(([key, value], index) => {
      query += `${key}=${value}${index !== lastItemIndex ? '&' : ''}`;
    });
    const response: AxiosResponse = await gigsService.searchGigs(`${query}`, from, size, type);
    res.status(StatusCodes.OK).json({ message: response.data.message, total: response.data.total, gigs: response.data.gigs });
  }
}
