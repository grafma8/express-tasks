import { Connection, createConnection } from "typeorm";
import { User } from "../../domain/entity/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import faker from "faker";

describe("Factory Integration Test", () => {
  let connection: Connection;
  let prepared_email: string;
  let prepared_password: string;
  beforeAll(async (done) => {
    connection = await createConnection("test");
    prepared_email = faker.internet.email();
    prepared_password = faker.internet.password();
    done();
  });

  // afterAll(async (done) => {
  // });

  it("should register a user", async (done) => {
    const user = connection.getRepository(User).create();
    user.user_name = "test_example";
    user.email = prepared_email;
    user.password = prepared_password;
    user.type = 0;
    user.status = 0;

    const created = await connection.getRepository(User).save(user);
    expect(created.user_name).toBe(user.user_name);
    done();
  });

  it("should not validate existing user", async (done) => {
    const isExists = await connection
      .getCustomRepository(UserRepository)
      .isExists(prepared_email);
    expect(isExists).toBe(true);
    done();
  });

  it("should find a user", async (done) => {
    const user = await connection
      .getCustomRepository(UserRepository)
      .findByEmail(prepared_email);
    expect(user instanceof User).toBe(true);
    done();
  });

  it("should can check password", async (done) => {
    const user = await connection
      .getCustomRepository(UserRepository)
      .findByEmail(prepared_email);
    if (user) {
      const result = await User.comparePassword(
        prepared_password,
        user.password
      );
      expect(result).toBe(true);
      done();
    }
  });

  it("should not find user", async (done) => {
    const user = await connection
      .getCustomRepository(UserRepository)
      .findByEmail("example_false@examle.com");
    expect(user).toBeUndefined();
    done();
  });
});
