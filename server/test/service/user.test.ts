import { Connection, createConnection } from "typeorm";
import { User } from "../../domain/entity/User";
import { UserService } from "../../services/UserService";
import faker from "faker";
import { AuthService } from "../../services/AuthService";

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
    const user_name = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const userService = new UserService();
    const result = await userService.createUser(user_name, email, password);
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
});
