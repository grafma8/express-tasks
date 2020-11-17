import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { Category } from "../entity/Category";
import { User } from "../entity/User";
import { AuthService } from "../../services/AuthService";

export default class CreateCategories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Category)()
      .map(async (category: Category) => {
        const user: User = await factory(User)()
          .map(async (user: User) => {
            const authService = new AuthService(user);
            user.activation_token = await authService.generateUserActivationToken();
            return user;
          })
          .create();

        category.owner = user;
        return category;
      })
      .createMany(10);
  }
}
