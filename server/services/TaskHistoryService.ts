import { getCustomRepository } from "typeorm";
import { TaskHistory } from "../domain/entity/TaskHistory";
import { Task } from "../domain/entity/Task";
import { TaskHistoryRepository } from "../domain/repository/TaskHistoryRepository";
import { debugLogger, errorLogger } from "../utils/log";

export class TaskHistoryService {
  taskHistoryRepository: TaskHistoryRepository;
  task: Task;

  constructor(task: Task) {
    this.taskHistoryRepository = getCustomRepository(TaskHistoryRepository);
    this.task = task;
  }

  async create(
    taskHistoryPart: Partial<TaskHistory>
  ): Promise<TaskHistory | false> {
    const {
      time_done = new Date(),
      duration = Math.floor(
        (this.task.time_start.getTime() - new Date().getTime()) / 1000
      ),
    } = taskHistoryPart;
    const taskHistory = this.taskHistoryRepository.create({
      time_done: time_done,
      duration: duration,
    });
    taskHistory.task = this.task;
    try {
      await this.taskHistoryRepository.save(taskHistory);
    } catch (e) {
      errorLogger.error(e);
      return false;
    }
    return taskHistory;
  }

  async findAll(queryParams: any = {}): Promise<[TaskHistory[], number]> {
    const { page = 1, pageSize = 10, ...otherParams } = queryParams;
    const query = this.taskHistoryRepository
      .createQueryBuilder("task_history")
      .orderBy("task_history.created_at", "DESC")
      .offset((page - 1) * pageSize)
      .limit(pageSize);
    // @Todo other params
    return query.getManyAndCount();
  }

  async findById(task_history_id: number): Promise<any> {
    const taskHistory = await this.taskHistoryRepository.findOne(
      task_history_id
    );
    if (!taskHistory) throw new Error("Task history not found");
    return taskHistory;
  }

  async updateById(
    task_history_id: number,
    taskHistoryPart: Partial<TaskHistory>
  ): Promise<any> {
    const isExists = await this.taskHistoryRepository.findOne(task_history_id);
    // @Todo ???
    if (!isExists) throw new Error("Task history not found");
    const result = this.taskHistoryRepository.update(
      task_history_id,
      taskHistoryPart
    );
    return result;
  }

  async deleteById(task_history_id: number): Promise<any> {
    const result = this.taskHistoryRepository.delete(task_history_id);
    return result;
  }
}
