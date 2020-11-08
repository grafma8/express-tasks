import Faker from "faker";
import { Connection, getCustomRepository} from "typeorm";
import { define, factory } from "typeorm-seeding";
import { Category } from "../entity/Category";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

define(Category, (faker: typeof Faker, context?: {connection?: Connection}) => {
  if (context?.connection === undefined) throw Error('factory connection error')
  const connection = context.connection

  const category = new Category();
  category.name = faker.lorem.word();
  category.type = 0;

  const user = connection.getCustomRepository(UserRepository).findOne({
    user_id: 1,
  }) as any;
  category.owner = user;

  return category;
});
