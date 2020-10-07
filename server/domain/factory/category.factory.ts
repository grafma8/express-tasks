import Faker from "faker";
import { getCustomRepository } from "typeorm";
import { define, factory } from "typeorm-seeding";
import { Category } from "../entity/Category";
import { User } from "../entity/User";
import { CategoryRepository } from "../repository/CategoryRepository";
import { UserRepository } from "../repository/UserRepository";

define(Category, (faker: typeof Faker) => {
  const category = getCustomRepository(CategoryRepository).create();
  category.name = faker.lorem.word();
  category.type = 0;

  // category.owner = factory(User)() as any;
  const user = getCustomRepository(UserRepository).findOne({user_id: 1}) as any
  category.owner = user;

  return category;
});
