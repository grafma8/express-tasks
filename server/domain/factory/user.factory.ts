import Faker from "faker";
import bcrypt from "bcrypt";
import { define } from "typeorm-seeding";
import { User } from "../entity/User";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";

define(User, (faker: typeof Faker) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const userName = faker.name.findName();
  const email = faker.internet.email(firstName, lastName);
  const password = faker.internet.password();

  // const user = new User();
  const user = getCustomRepository(UserRepository).create();
  user.user_name = userName;
  user.email = email;
  user.password = password;
  return user;
});
