import { Connection, createConnection } from "typeorm";
import { Task, TaskStatus, TaskType } from "../../domain/entity/Task";
import { User } from "../../domain/entity/User";
import { TaskService } from "../../services/TaskService";
import { UserService } from "../../services/UserService";
import faker from "faker";
import { debugLogger } from "../../utils/log";

describe("TaskService", () => {
  let taskService: TaskService;
  let user: User | false;
  beforeAll(async (done) => {
    await createConnection("default");
    const userService = new UserService();
    user = await userService.create({
      user_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    if(!user) throw new Error()
    taskService = new TaskService(user);
    done();
  });

  beforeEach(async (done) => {
    jest.useFakeTimers();
    done();
  });

  it("should create an task", async (done) => {
    const result = await taskService.create({
      name: faker.lorem.word(),
      status: TaskStatus.CREATED,
      type: TaskType.ONCE
    });
    expect(result).not.toBeFalsy();
    done();
  });

  it("should find all tasks", async (done) => {
    const result = await TaskService.findAll({
      page: 1,
      pageSize: 10,
      status: TaskStatus.CREATED,
      type: TaskType.ONCE,
    });
    expect(result[0]).not.toBeUndefined();
    expect(typeof result[1]).toBe("number");
    done();
  });

  it("should create and find the task", async (done) => {
    const created = await taskService.create({
      name: faker.lorem.word(),
      status: TaskStatus.CREATED,
      type: TaskType.ONCE
    });
    if (!created) throw new Error()
    const result = await taskService.findById(created.task_id)
    expect(result).not.toBeUndefined();
    done();
  });

  it("should create and update the task", async (done) => {
    const created = await taskService.create({
      name: faker.lorem.word(),
      status: TaskStatus.CREATED,
      type: TaskType.ONCE
    });
    if (!created) throw new Error()
    const result = await taskService.updateById(created.task_id, {
      name: faker.lorem.word()
    })
    expect(result).not.toBeUndefined();
    debugLogger.debug(result);
    done();
  });

  it("should create and delete the task", async (done) => {
    const created = await taskService.create({
      name: faker.lorem.word(),
      status: TaskStatus.CREATED,
      type: TaskType.ONCE
    });
    if (!created) throw new Error()
    const result = await taskService.deleteById(created.task_id)
    expect(result).not.toBeUndefined();
    debugLogger.debug(result);
    done();
  });
});
