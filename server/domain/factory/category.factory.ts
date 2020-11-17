import Faker from "faker";
import { Connection, getCustomRepository } from "typeorm";
import { define, factory } from "typeorm-seeding";
import { Category } from "../entity/Category";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

define(Category, (faker: typeof Faker, context?: {}) => {
  const category = new Category();
  category.name = faker.lorem.word();
  category.type = 0;

  return category;
});
