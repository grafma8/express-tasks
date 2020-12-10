import {
  getCustomRepository,
  getConnection,
  DeleteResult,
  UpdateResult,
} from "typeorm";
import { User, UserType, UserStatus } from "../domain/entity/User";
import { UserRepository } from "../domain/repository/UserRepository";
import { debugLogger, errorLogger } from "../utils/log";
import { AuthService } from "./AuthService";

export class UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create(userPart: Partial<User>): Promise<User | false> {
    const user = this.userRepository.create(userPart);
    const result = await this.userRepository.save(user);
    debugLogger.debug(result);
    return result;
  }

  async checkJWTTokenAndActivate(token: string): Promise<User | false> {
    const user_id = await AuthService.getUserIdFromToken(token);
    if (!user_id) return false;

    const user = await this.userRepository.findOne(user_id);
    if (!user) return false;

    const authService = new AuthService(user);
    const result = await authService.verifyActivationJWTToken(token);
    if (!result) return false;

    user.status = UserStatus.ACTIVE;
    try {
      await this.userRepository.save(user);
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
    const user = await this.userRepository.findByEmail(email);
    return user != null;
  }

  async findAll(queryParams: any = {}): Promise<[User[], number]> {
    const {
      page = 1,
      pageSize = 10,
      userStatus,
      userType,
      ...otherParams
    } = queryParams;
    const query = this.userRepository
      .createQueryBuilder("user")
      .orderBy("user.created_at", "DESC")
      .offset((page - 1) * pageSize)
      .limit(pageSize);
    if (userStatus) {
      query.andWhere("user.status=:status").setParameter("status", userStatus);
    }
    if (userType) {
      query.andWhere("user.type=:type").setParameter("type", userType);
    }
    // @Todo other params
    return query.getManyAndCount();
  }

  async findById(user_id: number): Promise<User> {
    const user = await this.userRepository.findOne(user_id);
    if (!user) throw new Error("User not found")
    return user;
  }

  async updateById(
    user_id: number,
    userPart: Partial<User>
  ): Promise<UpdateResult | false> {
    const isExists = await this.userRepository.findOne(user_id);
    // @Todo ???
    if (!isExists) throw new Error("User not found");
    const result = this.userRepository.update(user_id, userPart);
    return result;
  }

  async deleteById(user_id: number): Promise<DeleteResult> {
    const result = this.userRepository.delete(user_id);
    // @Todo ???
    return result;
  }
}
