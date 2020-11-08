import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { TaskHistory } from "../entity/TaskHistory";

export default class CreateTaskHistories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(TaskHistory)({ connection: connection }).createMany(10);
  }
}
