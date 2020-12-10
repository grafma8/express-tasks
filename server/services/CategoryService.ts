import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../domain/repository/CategoryRepository";
import { Category, CategoryType } from "../domain/entity/Category";
import { User } from "../domain/entity/User";
import { errorLogger, debugLogger } from "../utils/log";

export class CategoryService {
  categoryRepository: CategoryRepository;
  owner: User;

  constructor(user: User) {
    this.categoryRepository = getCustomRepository(CategoryRepository);
    this.owner = user;
  }

  async create(categoryPart: Partial<Category>): Promise<Category | false> {
    const category = this.categoryRepository.create(categoryPart);
    category.owner = this.owner;
    try {
      await this.categoryRepository.save(category);
    } catch (err) {
      errorLogger.error(err);
      return false;
    }
    debugLogger.debug(category);
    return category;
  }

  static async findAll(queryParams: any = {}): Promise<[Category[], number]> {
    const {
      page = 1,
      pageSize = 10,
      categoryType = CategoryType.DEFAULT,
      ...otherParams
    } = queryParams;
    const query = getCustomRepository(CategoryRepository)
      .createQueryBuilder("category")
      .orderBy("category.created_at", "DESC")
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .andWhere("category.type=:type")
      .setParameter("type", categoryType);
    // @Todo other params
    return query.getManyAndCount();
  }

  async findById(category_id: number): Promise<any> {
    const category = this.categoryRepository.findOne(category_id);
    if (!category) throw new Error("Category not found");
    return category;
  }

  async updateById(
    category_id: number,
    categoryPart: Partial<Category>
  ): Promise<any> {
    const isExists = await this.categoryRepository.findOne(category_id);
    // @Todo ???
    if (!isExists) throw new Error("Category not found");
    const result = this.categoryRepository.update(category_id, categoryPart);
    return result;
  }

  async deleteById(category_id: number): Promise<any> {
    const result = this.categoryRepository.delete(category_id);
    return result;
  }
}
