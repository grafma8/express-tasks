import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Task } from "./Task";

@Entity()
export class TaskHistory {
  @PrimaryGeneratedColumn()
  task_history_id!: number;

  @Column()
  time_done!: Date;

  @Column({ type: "int8" })
  duration!: number;

  @ManyToOne((type) => Task, (task) => task.task_histories, { nullable: false })
  @JoinColumn({ name: "task_id" })
  task!: Task;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
