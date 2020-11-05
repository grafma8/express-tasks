import { Connection, createConnection, getCustomRepository } from "typeorm";
import { User } from "../../domain/entity/User";
import { CategoryRepository } from "../../domain/repository/CategoryRepository";
import { TaskHistoryRepository } from "../../domain/repository/TaskHistoryRepository";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { UserRepository } from "../../domain/repository/UserRepository";

describe("Sample Tasks Test", () => {
  let connection: Connection;
  beforeAll(async (done) => {
    connection = await createConnection("default");
    done();
  });

  afterAll(async (done) => {
    await connection.close();
  });

  it("should can select multiple users", async (done) => {
    const users = await getCustomRepository(UserRepository).findByIds([
      1,
      2,
      3,
    ]);
    expect(users.length).toBe(3);
    done();
  });

  it("should can select multiple categories", async (done) => {
    const categories = await getCustomRepository(CategoryRepository).findByIds([
      1,
      2,
      3,
    ]);
    expect(categories.length).toBe(3);
    done();
  });

  it("should can select multiple tasks", async (done) => {
    const tasks = await getCustomRepository(TaskRepository).findByIds([
      1,
      2,
      3,
    ]);
    expect(tasks.length).toBe(3);
    done();
  });

  it("should can select multiple task histories", async (done) => {
    const taskHistories = await getCustomRepository(
      TaskHistoryRepository
    ).findByIds([1, 2, 3]);
    expect(taskHistories.length).toBe(3);
    done();
  });
});
