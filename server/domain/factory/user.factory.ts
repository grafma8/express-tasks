import Faker from "faker";
import { getCustomRepository, Connection } from "typeorm";
import { define } from "typeorm-seeding";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

define(User, (faker: typeof Faker, context?: {connection?: Connection}) => {
  if (context?.connection === undefined) throw new Error('factory connection error')
  const connection = context.connection

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const userName = faker.name.findName();
  const email = faker.internet.email(firstName, lastName);
  const password = faker.internet.password();

  const user = connection.getCustomRepository(UserRepository).create();
  user.user_name = userName;
  user.email = email;
  user.password = password;
  return user;
});
