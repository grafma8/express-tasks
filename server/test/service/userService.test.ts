import { Connection, createConnection } from "typeorm";
import { User, UserStatus, UserType } from "../../domain/entity/User";
import { UserService } from "../../services/UserService";
import faker from "faker";
import { AuthService } from "../../services/AuthService";
import { debugLogger } from "../../utils/log";

describe("UserService", () => {
  let user: User;
  beforeAll(async (done) => {
    await createConnection("default");
    done();
  });

  beforeEach(async (done) => {
    jest.useFakeTimers();
    done();
  });

  it("should create an user", async (done) => {
    const userName = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const userService = new UserService();
    const result = await userService.create({
      user_name: userName,
      email: email,
      password: password,
    });
    expect(result).not.toBeFalsy();
    if (!result) throw new Error();
    user = result;
    done();
  });

  it("should check token and activate", async (done) => {
    const authService = new AuthService(user);
    const token = await authService.generateActivationJWTToken();
    if (!token) throw new Error();

    const userService = new UserService();
    const result = userService.checkJWTTokenAndActivate(token);
    expect(result).not.toBeFalsy();
    done();
  });

  it("should find all users", async (done) => {
    const result = await UserService.findAll({
      page: 1,
      pageSize: 10,
      status: UserStatus.VERIFYING,
      type: UserType.NORMAL,
    });
    expect(result[0]).not.toBeUndefined();
    expect(typeof result[1]).toBe("number");
    done();
  });

  it("should create and find", async (done) => {
    const userService = new UserService();
    const user = await userService.create({
      user_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    if (!user) throw new Error();
    const result = await userService.findById(user.user_id);
    expect(result).not.toBeUndefined();
    done();
  });

  it("should create and update", async (done) => {
    const userService = new UserService();
    const user = await userService.create({
      user_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    if (!user) throw new Error();
    const result = await userService.updateById(user.user_id, {
      email: faker.internet.email(),
    });
    expect(result).not.toBeUndefined();
    debugLogger.debug(result);
    done();
  });

  it("should create and delete", async (done) => {
    const userService = new UserService();
    const user = await userService.create({
      user_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    if (!user) throw new Error();
    const result = await userService.deleteById(user.user_id);
    expect(result).not.toBeUndefined();
    debugLogger.debug(result);
    done();
  });
});
