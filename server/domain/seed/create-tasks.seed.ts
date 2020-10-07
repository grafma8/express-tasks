import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { Task } from "../entity/Task";

export default class CreateTasks implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Task)({ roles: [] }).createMany(10);
  }
}
