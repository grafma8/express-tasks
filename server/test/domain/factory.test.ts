import { Connection } from "typeorm";
import {
  useSeeding,
  useRefreshDatabase,
  tearDownDatabase,
  factory,
} from "typeorm-seeding";
import { User } from "../../domain/entity/User";
import { Task } from "../../domain/entity/Task";
import { Category } from "../../domain/entity/Category";
import { TaskHistory } from "../../domain/entity/TaskHistory";

describe("Factory Integration Test", () => {
  let connection: Connection;
  beforeAll(async (done) => {
    connection = await useRefreshDatabase({ connection: "test" });
    await useSeeding();
    done();
  });

  afterAll(async (done) => {
    await tearDownDatabase();
  });

  it("should create a user with the entity factory", async (done) => {
    const createdUser = await factory(User)({
      connection: connection,
    }).create();
    const user = await connection
      .getRepository(User)
      .findOne(createdUser.user_id);
    if (user) {
      expect(createdUser.user_name).toBe(user.user_name);
    }
    done();
  });

  it("should create a category with the entity factory", async (done) => {
    const createdUser = await factory(Category)({
      connection: connection,
    }).create();
    const user = await connection
      .getRepository(Category)
      .findOne(createdUser.category_id);
    if (user) {
      expect(createdUser.name).toBe(user.name);
    }
    done();
  });

  it("should create a task with the entity factory", async (done) => {
    const createdTask = await factory(Task)({
      connection: connection,
    }).create();
    const task = await connection
      .getRepository(Task)
      .findOne(createdTask.task_id);
    if (task) {
      expect(createdTask.name).toBe(task.name);
    }
    done();
  });

  it("should create a task-history with the entity factory", async (done) => {
    const createdTaskHistory = await factory(TaskHistory)({
      connection: connection,
    }).create();
    const taskHistory = await connection
      .getRepository(TaskHistory)
      .findOne(createdTaskHistory.task_history_id);
    if (taskHistory) {
      expect(createdTaskHistory.time_done.toISOString()).toBe(taskHistory.time_done.toISOString());
    }
    done();
  });
});
