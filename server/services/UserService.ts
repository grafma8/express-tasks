import { getRepository,getCustomRepository, getConnection, Repository } from "typeorm";
import { User, UserType, UserStatus } from "../domain/entity/User";
import { UserRepository } from "../domain/repository/UserRepository";
import { debugLogger, errorLogger } from "../utils/log";
import { AuthService } from "./AuthService";

export class UserService {
  repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async createUser(
    user_name: string,
    email: string,
    password: string
  ): Promise<User | false> {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let user: User;
    try {
      user = queryRunner.manager.create(User, {
        user_name: user_name,
        password: password,
        email: email,
      });
      user = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
    } catch (err) {
      errorLogger.error(err);
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
    debugLogger.debug(user);
    return user;
  }

  async checkJWTTokenAndActivate(
    token: string
  ): Promise<User | false> {

    const user_id = await AuthService.getUserIdFromToken(token);
    if (!user_id) return false

    const user = await this.repository.findOne({user_id: user_id});
    if (!user) return false;

    const authService = new AuthService(user);
    const result = await authService.verifyActivationJWTToken(token);
    if (!result) return false;

    user.status = UserStatus.ACTIVE;
    try {
      await this.repository.save(user);
    } catch (err) {
      errorLogger.error(err);
      return false;
    }
    return user;
  }

  /**
  * Check whether same email has been registered or not
  * @param {string} email
  * @param {boolean} - whether exists or not
  */
  async isEmailExists(email: string): Promise<boolean> {
    const userCustomRepository = getCustomRepository(UserRepository);
    const user = await userCustomRepository.findByEmail(email);
    return user != null;
  }
}
