import { EntityRepository, Repository } from "typeorm";
import { TaskHistory } from "../entity/TaskHistory";

@EntityRepository(TaskHistory)
export class TaskHistoryRepository extends Repository<TaskHistory> {
  
}
