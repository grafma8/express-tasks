import supertest from "supertest";
import app from "../../app";

const request = supertest(app);

describe("GET /", () => {
  it("should get status 200", async (done) => {
    const res = await request.get("/");
    expect(res.status).toBe(200);
    done();
  });
});

describe("GET /ping", () => {
  it("should get status 200 pong", async (done) => {
    const res = await request.get("/ping");
    expect(res.status).toBe(200);
    expect(res.text).toEqual("pong");
    done();
  });
});

describe("GET /favicon.ico", () => {
  it("should get status 200", async (done) => {
    const res = await request.get("/favicon.ico");
    expect(res.status).toBe(200);
    done();
  });

  it("should get status 200", async (done) => {
    const res = await request.get("/assets/img/favicon.ico");
    expect(res.status).toBe(200);
    done();
  });
});