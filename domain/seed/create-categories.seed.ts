import { Seeder, Factory } from "typeorm-seeding";
import { Category } from "../entity/Category";

export default class CreateCategories implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Category)({ roles: [] }).createMany(10);
  }
}
