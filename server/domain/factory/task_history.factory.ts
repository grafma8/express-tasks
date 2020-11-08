import Faker from "faker";
import { Connection, getCustomRepository } from "typeorm";
import { define, factory } from "typeorm-seeding";
import { TaskHistory } from "../entity/TaskHistory";
import { TaskRepository } from "../repository/TaskRepository";

define(TaskHistory, (faker: typeof Faker, context?: {connection?: Connection}) => {
  if (context?.connection === undefined) throw Error('factory connection error');
  const connection = context?.connection

  const task_hist = new TaskHistory();
  task_hist.time_done = faker.date.past();
  task_hist.duration =
    faker.date.future().getTime() - task_hist.time_done.getTime();
  
  const task = connection.getCustomRepository(TaskRepository).findOne({
    task_id: 1,
  }) as any;
  task_hist.task = task;

  return task_hist;
});
