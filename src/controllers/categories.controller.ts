import { Request, Response } from 'express';

import { CategoriesRepository } from '../database/repositories/categories.repository';
import { CategoryModel } from '../database/schemas/category.schema';
import { CreateCategoryDTO } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';

export class CategoriesController {
  async create(
    req: Request<unknown, unknown, CreateCategoryDTO>,
    res: Response,
  ) {
    const { title, color } = req.body;

    const repository = new CategoriesRepository(CategoryModel);
    const service = new CategoriesService(repository);

    const newCategory = await service.create({ title, color });

    return res.status(201).json(newCategory);
  }
}
