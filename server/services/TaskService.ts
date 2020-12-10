import { getCustomRepository } from "typeorm";
import { TaskRepository } from "../domain/repository/TaskRepository";
import { Task, TaskStatus, TaskType } from "../domain/entity/Task";
import { User } from "../domain/entity/User";
import { errorLogger } from "../utils/log";

export class TaskService {
  private taskRepository: TaskRepository;
  private owner: User;

  constructor(user: User) {
    this.taskRepository = getCustomRepository(TaskRepository);
    this.owner = user;
  }

  // @TODO create func for other task types
  async create(taskPart: Partial<Task>): Promise<Task | false> {
    const { name } = taskPart;
    const {
      type = TaskType.ONCE,
      status = TaskStatus.CREATED,
      time_start = new Date(),
      time_end = new Date(),
      time_remain = 0,
    } = taskPart;
    const task = this.taskRepository.create({
      name: name,
      type: type,
      status: status,
      owner: this.owner,
      time_start: time_start,
      time_end: time_end,
      time_remain: time_remain
    });
    task.owner = this.owner;
    try {
      await this.taskRepository.save(task);
    } catch (err) {
      errorLogger.error(err);
      return false;
    }
    return task;
  }

  async findAll(queryParams: any = {}): Promise<[Task[], number]> {
    const {
      page = 1,
      pageSize = 10,
      taskStatus,
      taskType,
      ...otherParams
    } = queryParams;
    const query = this.taskRepository
      .createQueryBuilder("task")
      .orderBy("task.created_at", "DESC")
      .offset((page - 1) * pageSize)
      .limit(pageSize);
    if (taskStatus) {
      query.andWhere("task.status=:status").setParameter("status", taskStatus);
    }
    if (taskType) {
      query.andWhere("task.type=:type").setParameter("type", taskType);
    }
    // @Todo other params
    return query.getManyAndCount();
  }

  async findById(task_id: number): Promise<Task | undefined> {
    const result = await this.taskRepository.findOne(task_id);
    if (!result) throw new Error("Task not found");
    return result;
  }

  async updateById(task_id: number, taskPart: Partial<Task>): Promise<any> {
    const isExists = await this.taskRepository.findOne(task_id);
    // @Todo ???
    if (!isExists) throw new Error("Task not found");
    const result = this.taskRepository.update(task_id, taskPart);
    return result;
  }

  // @Todo ???
  async deleteById(task_id: number): Promise<any> {
    const result = this.taskRepository.delete(task_id);
    return result;
  }
}
