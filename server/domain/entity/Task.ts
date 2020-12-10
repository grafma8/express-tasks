import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import { Min } from "class-validator";
import { User } from "./User";
import { TaskHistory } from "./TaskHistory";
import { Category } from "./Category";

export enum TaskType {
  ONCE = 10,
  ONCE_SCHEDULED = 11,
  EVERY_DAY = 20,
  EVERY_WEEK = 30,
  EVERY_2WEEK = 31,
  EVERY_MONTH = 40,
  EVERY_WEEKDAY = 50,
  EVERY_WEEKEND = 51,
  EVERY_YEAR = 52,
}

export enum TaskStatus {
  CREATED = 10,
  STARTED = 20,
  FINISHED = 30,
  DONE = 40,
  ARCHIVED = 50,
  DELETED = 60,
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  task_id!: number;

  @Column()
  @Min(3)
  name!: string;

  @Column({
    // type: "timestamp",
  })
  time_start!: Date;

  @Column({
    // type: "timestamp",
  })
  time_end!: Date;

  @Column({
    type: "int8",
  })
  time_remain!: number;

  @Column({
    type: "int2",
    default: TaskType.ONCE,
  })
  type!: TaskType;

  @Column({
    type: "int2",
    default: TaskStatus.CREATED,
  })
  status!: TaskStatus;

  @OneToMany((type) => TaskHistory, (task_history) => task_history.task)
  task_histories?: TaskHistory[];

  @ManyToOne((type) => User, (owner) => owner.tasks, { nullable: false })
  @JoinColumn({ name: "owner_id" })
  owner!: User;

  @ManyToMany((type) => Category)
  categories?: Category[];

  @ManyToOne((type) => Task, (task) => task.children)
  @JoinColumn({ name: "parent_id" })
  parent?: Task;

  @OneToMany((type) => Task, (task) => task.parent)
  children?: Task[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
