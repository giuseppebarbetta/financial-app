import { Category } from '../entities/category.entity';

export class CategoriesService {
  async create(): Promise<Category> {
    const category = await new Category({
      title: 'Exemplo of Category',
      color: '#c1fb72',
    });

    return category;
  }
}
