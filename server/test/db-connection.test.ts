import { Connection, createConnection} from "typeorm";

describe("Factory Integration Test", () => {

  it("should create default db connection", async (done) => {
    const connection = await createConnection("default")
    expect(connection.options.name).toBe("default")
    done();
  });

  it("should create test db connection", async (done) => {
    const connection = await createConnection("test")
    expect(connection.options.name).toBe("test")
    done();
  });

});
