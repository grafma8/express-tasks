import { Connection } from 'typeorm';
import { Seeder, Factory } from "typeorm-seeding";
import { User } from "../entity/User";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(User)({ roles: [] }).createMany(10);
  }
}
