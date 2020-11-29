import app from "../../app";
import supertest from "supertest";
import { JSDOM } from "jsdom";
import faker from "faker";
import { createConnection } from "typeorm";
import { type } from "os";

describe("Register controller test", () => {
  const request = supertest(app);
  beforeAll(async (done) => {
    await createConnection("default");
    done();
  });

  it("should get register/mail_start_complete", async (done) => {
    const res = await request.get("/register/mail_complete");
    expect(res.status).toBe(200);
    done();
  });

  it("should get register/complete", async (done) => {
    const res = await request.get("/register/complete");
    expect(res.status).toBe(200);
    done();
  });

  const agent = supertest.agent(app);
  it("should get /register", async (done) => {
    const res = await agent.get("/register");
    expect(res.status).toBe(200);
    done();
  });

  it("should post /register and denied", async (done) => {
    const res = await agent.post("/register");
    expect(res.status).toBe(500);
    done();
  });

  it("should post /register", async (done) => {
    let res = await agent.get("/register");
    const { window } = new JSDOM(res.text);
    const csrf = window.document.head
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");
    const passwd = faker.internet.password();
    res = await agent.post("/register").send({
      _csrf: csrf,
      user_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: passwd,
      password_confirm: passwd,
    });
    expect(res.status).toBe(302);
    expect(res.headers["location"]).toMatch(/\/register\/mail_complete/);
    done();
  });
});
