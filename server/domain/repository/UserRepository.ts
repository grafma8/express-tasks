import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByName(user_name: string) : Promise<User | undefined>{
    return this.findOne({ user_name: user_name });
  }

  findByEmail(email: string) : Promise<User | undefined>{
    return this.findOne({email: email})
  }


  // service funcs
  /**
  * Check whether same email has been registered or not
  * @param {string} email
  * @param {boolean} - whether exists or not
  */
  async isExists(email: string): Promise<boolean | undefined> {
    const user = await this.findByEmail(email);
    return user != null;
  }
}
