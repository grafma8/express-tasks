import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { User } from "../entity/User";
import { AuthService } from "../../services/AuthService";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    for (let i = 0; i < 10; i++) {
      await factory(User)()
        .map(async (user: User) => {
          const authService = new AuthService(user);
          user.activation_token = await authService.generateUserActivationToken();
          return user;
        })
        .create();
    }
  }
}
