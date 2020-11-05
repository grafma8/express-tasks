import {
  useSeeding,
  useRefreshDatabase,
  tearDownDatabase,
  factory,
  setConnectionOptions,
} from "typeorm-seeding";
import { User } from "../../domain/entity/User";
import { Connection } from "typeorm";
import { Task } from "../../domain/entity/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";

describe("Sample Integration Test", () => {
  let connection: Connection;
  beforeAll(async (done) => {
    setConnectionOptions({
      type: "sqlite",
      // database: ":memory:",
      database: "test.db",
      // entities: ["../../domain/entity/**/*{.ts,.js}"],
      entities: [__dirname + "/../../domain/entity/*{.js,.ts}"],
      synchronize: true,
    });
    connection = await useRefreshDatabase();
    await useSeeding();
    done();
  });

  afterAll(async (done) => {
    await tearDownDatabase();
  });

  test("Should create a user with the entity factory", async (done) => {
    const createdUser = await factory(User)().create();
    const user = await connection
      .getRepository(User)
      .findOne(createdUser.user_id);
    if (user) {
      expect(createdUser.user_name).toBe(user.user_name);
    }
    done();
  });

  test("Should create a task with the entity factory", async (done) => {
    const createdTask = await factory(Task)().create();
    const task = await connection
      .getCustomRepository(TaskRepository)
      .findOne(createdTask.task_id);
    if (task) {
      expect(createdTask.name).toBe(task.name);
    }
    done();
  });
});
