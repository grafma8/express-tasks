import Faker from "faker";
import { Connection, getCustomRepository } from "typeorm";
import { define, factory } from "typeorm-seeding";
import { TaskHistory } from "../entity/TaskHistory";
import { TaskRepository } from "../repository/TaskRepository";

define(TaskHistory, (faker: typeof Faker, context?: Record<string, unknown>) => {
  const task_hist = new TaskHistory();
  task_hist.time_done = faker.date.past();
  task_hist.duration =
    faker.date.future().getTime() - task_hist.time_done.getTime();

  return task_hist;
});
