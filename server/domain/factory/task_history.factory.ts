import Faker from "faker";
import { getCustomRepository } from "typeorm";
import { define, factory } from "typeorm-seeding";
import { TaskHistory } from "../entity/TaskHistory";
import { TaskHistoryRepository } from "../repository/TaskHistoryRepository";
import { TaskRepository } from "../repository/TaskRepository";

define(TaskHistory, (faker: typeof Faker) => {
  const task_hist = getCustomRepository(TaskHistoryRepository).create();
  task_hist.time_done = faker.date.past();
  task_hist.duration =
    faker.date.future().getTime() - task_hist.time_done.getTime();

  const task = getCustomRepository(TaskRepository).findOne({
    task_id: 1,
  }) as any;
  task_hist.task = task;

  return task_hist;
});
