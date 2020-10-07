import supertest from "supertest";
import { app } from "../app";

describe("sample api test", () => {
  it("should get status 200", async (done) => {
    const req = {
      query: {
        id: 1,
      },
    };
    // const res = {
    //     status: jest.fn().mockReturnThis(),
    //     send: jest.fn().mockReturnThis()
    // }
    const request = supertest(app);
    const response = await request.get("/api/v1/test");

    expect(response.status).toBe(200);
    // expect(response.text).toEqual("hello");

    // expect(res.status.mock.calls[0][0]).toBe(200)
    done();
  });
});
