import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByName(user_name: string) {
    return this.findOne({ user_name });
  }
}
