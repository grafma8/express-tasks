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
  })
  type!: number;

  @Column({
    type: "int2",
    default: 0,
  })
  status!: number;

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
