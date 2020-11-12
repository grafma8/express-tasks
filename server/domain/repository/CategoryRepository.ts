import { EntityRepository, Repository } from "typeorm";
import { Category } from "../entity/Category";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  findByName(name: string): Promise<Category | undefined> {
    return this.findOne({ name: name });
  }
}
