import Faker from "faker";
import { getCustomRepository, Connection } from "typeorm";
import { define } from "typeorm-seeding";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";
import { AuthService } from "../../services/AuthService";

define(User, (faker: typeof Faker, context?: {}) => {
  const userName = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  const user = new User();
  user.user_name = userName;
  user.email = email;
  user.password = password;

  return user;
});
