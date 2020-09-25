import Faker from "faker";
import { getCustomRepository } from "typeorm";
import { define, factory } from "typeorm-seeding";
import { Task } from "../entity/Task";
import { User } from "../entity/User";
import { TaskRepository } from "../repository/TaskRepository";
import { UserRepository } from "../repository/UserRepository";

define(Task, (faker: typeof Faker) => {
  const task = getCustomRepository(TaskRepository).create();
  task.task_name = faker.lorem.word();
  task.time_start = faker.date.past();
  task.time_end = faker.date.future();
  task.time_remain = task.time_end.getTime() - task.time_start.getTime();
  task.task_type = 0;
  task.task_status = 0;

  task.owner = factory(User)() as any;

  return task;
});
