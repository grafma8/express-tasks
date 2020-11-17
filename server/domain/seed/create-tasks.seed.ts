import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { Task } from "../entity/Task";
import { User } from "../entity/User";
import { AuthService } from "../../services/AuthService";

export default class CreateTasks implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Task)({ connection: connection })
      .map(async (task: Task) => {
        const user = await factory(User)()
          .map(async (user: User) => {
            const authService = new AuthService(user);
            user.activation_token = await authService.generateUserActivationToken();
            return user;
          })
          .create();
        task.owner = user;
        return task;
      })
      .createMany(10);
  }
}
