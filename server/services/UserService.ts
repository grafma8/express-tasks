import { getCustomRepository } from "typeorm";
import { User } from "../domain/entity/User";
import { UserRepository } from "../domain/repository/UserRepository";

class UserService {
  repository: UserRepository;

  constructor() {
    this.repository = getCustomRepository(UserRepository);
  }


}

export default UserService;
