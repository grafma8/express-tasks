import supertest from "supertest";
import app from "../app";

describe("sample api test", () => {
  it("should get status 200 pong", async (done) => {
    const request = supertest(app);
    const response = await request.get("/api/v1/ping");
    expect(response.status).toBe(200);
    expect(response.text).toEqual("pong");
    done();
  });
});
