import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateCategoryDTO } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';
import { BodyRequest } from './types';

export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  create = async (
    req: BodyRequest<CreateCategoryDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, color } = req.body;

      const newCategory = await this.categoriesService.create({ title, color });

      return res.status(StatusCodes.CREATED).json(newCategory);
    } catch (err) {
      next(err);
    }
  };

  index = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const newCategory = await this.categoriesService.index();

      return res.status(StatusCodes.OK).json(newCategory);
    } catch (err) {
      next(err);
    }
  };
}
