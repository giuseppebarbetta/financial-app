import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { CategoriesRepository } from '../database/repositories/categories.repository';
import { CategoryModel } from '../database/schemas/category.schema';
import { CreateCategoryDTO } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';

export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  async create(
    req: Request<unknown, unknown, CreateCategoryDTO>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { title, color } = req.body;

      const newCategory = await this.categoriesService.create({ title, color });

      return res.status(StatusCodes.CREATED).json(newCategory);
    } catch (err) {
      next(err);
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const newCategory = await this.categoriesService.index();

      return res.status(StatusCodes.OK).json(newCategory);
    } catch (err) {
      next(err);
    }
  }
}
