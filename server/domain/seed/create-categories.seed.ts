import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { Category } from "../entity/Category";

export default class CreateCategories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Category)({ connection: connection }).createMany(10);
  }
}
