import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import faker from "faker";
import { getRepository, createConnection, Connection } from "typeorm";
import { User } from "../../domain/entity/User";
import { AuthService } from "../../services/AuthService";
import { debugLogger } from "../../utils/log";

describe("User func test", () => {
  let user: User;
  let authService: AuthService;
  let userRepository;
  let connection: Connection;
  let saved: User;

  beforeAll(async (done) => {
    connection = await createConnection("default");
    userRepository = getRepository(User);
    user = userRepository.create({
      user_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    saved = await userRepository.save(user);
    authService = new AuthService(saved);
    done();
  });

  afterAll(async (done) => {
    await connection.close();
  });

  it("should create good activation_token", async (done) => {
    const token = await authService.generateActivationJWTToken();
    expect(token).toMatch(/^eyJ.*/);
    done();
  });

  it("should validate activation_token", async (done) => {
    const token = await authService.generateActivationJWTToken();
    const result = await authService.verifyActivationJWTToken(token);
    expect(result).not.toBeFalsy();
    debugLogger.debug("should validate activation token:", result);
    done();
  });

  it("should falsy with invalid sign", async (done) => {
    const token = await authService.generateActivationJWTToken();
    if (!token) throw new Error();
    const nextChar = String.fromCharCode(token.charCodeAt(-1) + 1);
    let invalid_sign;
    if (nextChar.charCodeAt(0) >= 52) {
      invalid_sign = token.substring(0, -1) + "a";
    } else {
      invalid_sign = token.substring(0, -1) + nextChar;
    }

    let result;
    try {
      result = await authService.verifyActivationJWTToken(invalid_sign);
    } catch (err) {
      result = false;
    }
    expect(result).toBeFalsy();
    done();
  });
});
