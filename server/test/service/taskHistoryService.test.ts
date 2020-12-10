import { Connection, createConnection } from "typeorm";
import { TaskHistory } from "../../domain/entity/TaskHistory";
import { User } from "../../domain/entity/User";
import { Task, TaskStatus, TaskType } from "../../domain/entity/Task";
import { TaskService } from "../../services/TaskService";
import { TaskHistoryService } from "../../services/TaskHistoryService";
import { UserService } from "../../services/UserService";
import faker from "faker";
import { debugLogger } from "../../utils/log";

describe("TaskHistoryService", () => {
  let taskHistoryService: TaskHistoryService;
  let user: User | false;
  let task: Task | false;
  beforeAll(async (done) => {
    await createConnection("default");
    const userService = new UserService();
    user = await userService.create({
      user_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    if (!user) throw new Error();
    const taskService = new TaskService(user);
    task = await taskService.create({
      name: faker.lorem.word(),
      status: TaskStatus.CREATED,
      type: TaskType.ONCE,
    });
    if (!task) throw new Error();
    taskHistoryService = new TaskHistoryService(task);
    done();
  });

  beforeEach(async (done) => {
    jest.useFakeTimers();
    done();
  });

  it("should create an task history", async (done) => {
    const result = await taskHistoryService.create({});
    expect(result).not.toBeFalsy();
    done();
  });

  it("should find all task histories", async (done) => {
    const result = await TaskHistoryService.findAll({
      page: 1,
      pageSize: 10,
    });
    expect(result[0]).not.toBeUndefined();
    expect(typeof result[1]).toBe("number");
    done();
  });

  it("should create and find the task history", async (done) => {
    const created = await taskHistoryService.create({});
    if (!created) throw new Error();
    const result = await taskHistoryService.findById(created.task_history_id);
    expect(result).not.toBeUndefined();
    done();
  });

  it("should create and update the task history", async (done) => {
    const created = await taskHistoryService.create({});
    if (!created) throw new Error();
    const result = await taskHistoryService.updateById(
      created.task_history_id,
      {
        time_done: new Date(),
      }
    );
    expect(result).not.toBeUndefined();
    debugLogger.debug(result);
    done();
  });

  it("should create and delete the task history", async (done) => {
    const created = await taskHistoryService.create({});
    if (!created) throw new Error();
    const result = await taskHistoryService.deleteById(created.task_history_id);
    expect(result).not.toBeUndefined();
    debugLogger.debug(result);
    done();
  });
});
