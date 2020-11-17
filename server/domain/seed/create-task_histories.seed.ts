import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { Task } from "../entity/Task";
import { User } from "../entity/User";
import { TaskHistory } from "../entity/TaskHistory";
import { AuthService } from "../../services/AuthService";
export default class CreateTaskHistories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(TaskHistory)()
      .map(async (taskHistory: TaskHistory) => {
        const task = await factory(Task)()
          .map(async (task: Task) => {
            const user = await factory(User)().create();
            task.owner = user;
            return task;
          })
          .create();
        taskHistory.task = task;
        return taskHistory;
      })
      .createMany(10);
  }
}
