import Faker from "faker";
import { getCustomRepository, Connection } from "typeorm";
import { define, factory } from "typeorm-seeding";
import { Task } from "../entity/Task";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

define(Task, (faker: typeof Faker, context?: Record<string, unknown>) => {
  const task = new Task();
  task.name = faker.lorem.word();
  task.time_start = faker.date.past();
  task.time_end = faker.date.future();
  task.time_remain = task.time_end.getTime() - task.time_start.getTime();
  task.type = 0;
  task.status = 0;

  return task;
});
