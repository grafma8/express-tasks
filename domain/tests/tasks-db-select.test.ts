import { Connection, createConnection, getCustomRepository } from "typeorm";
import { User } from "../entity/User";
import { CategoryRepository } from "../repository/CategoryRepository";
import { TaskHistoryRepository } from "../repository/TaskHistoryRepository";
import { TaskRepository } from "../repository/TaskRepository";
import { UserRepository } from "../repository/UserRepository";

describe("Sample Tasks Test", () => {
  let connection: Connection;
  beforeAll(async (done) => {
    connection = await createConnection("default");
    done();
  });

  afterAll(async (done) => {
    await connection.close();
  });

  it("User multiple select test", async (done) => {
    const users = await getCustomRepository(UserRepository).findByIds([1,2,3]);
    expect(users.length).toBe(3);
    done();
  });

  it("Category multiple select test", async (done) => {
    const categories = await getCustomRepository(CategoryRepository).findByIds([1,2,3]);
    expect(categories.length).toBe(3);
    done();
  });

  it("Task multiple select test", async (done) => {
    const tasks = await getCustomRepository(TaskRepository).findByIds([1,2,3]);
    expect(tasks.length).toBe(3);
    done();
  });

  it("Task history multiple select test", async (done) => {
    const taskHistories = await getCustomRepository(TaskHistoryRepository).findByIds([1,2,3]);
    expect(taskHistories.length).toBe(3);
    done();
  });
});