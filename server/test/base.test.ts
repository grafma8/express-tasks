import supertest from "supertest";
import app from "../app";
import { createConnection, getCustomRepository } from "typeorm";
import { User } from "../domain/entity/User";
import { UserRepository } from "../domain/repository/UserRepository";
import { debugLogger } from "../utils/log";
import { JSDOM } from "jsdom";
import { AuthService } from "../services/AuthService";

describe("passport local strategy test", () => {
  const test_email = "example@example.com";
  const test_password = "example_secret";
  beforeAll(async (done) => {
    await createConnection("default");
    const repo = getCustomRepository(UserRepository);
    const isExists = await repo.isExists(test_email);
    if (!isExists) {
      const user = new User();
      user.user_name = "example_test";
      user.email = test_email;
      user.password = test_password;
      await repo.save(user);
    }
    done();
  });

  const request = supertest(app);

  describe("auth required path", () => {
    it("should get status 302", async (done) => {
      const res = await request.get("/api/v1/users");
      expect(res.status).toBe(302);
      done();
    });
  });

  describe("auth login test", () => {
    const agent = supertest.agent(app);
    it("should get status 302", async (done) => {
      const res = await agent.get("/api/v1/users");
      expect(res.status).toBe(302);
      done();
    });

    it("should get login page", async (done) => {
      const res = await agent.get("/login");
      expect(res.status).toBe(200);
      done();
    });

    it("should not auth bad request (csrf)", async (done) => {
      const res = await agent.post("/login");
      expect(res.status).toBe(500);
      done();
    });

    it("should not auth bad request (body)", async (done) => {
      let res = await agent.get("/login");
      const { window } = new JSDOM(res.text);
      const csrf = window.document.head
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");
      res = await agent.post("/login").send({ _csrf: csrf });
      expect(res.status).toBe(302);
      done();
    });

    it("should auth", async (done) => {
      let res = await agent.get("/login");
      const { window } = new JSDOM(res.text);
      const csrf = window.document.head
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");
      debugLogger.debug(`csrf: ${csrf}`);
      res = await agent
        .post("/login")
        .send({ email: test_email, password: test_password, _csrf: csrf });
      expect(res.status).toBe(302);
      expect(res.headers["location"]).toMatch(/\//);
      done();
    });
  });
});
