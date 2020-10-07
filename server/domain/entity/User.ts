import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { IsEmail, Min } from "class-validator";
import { Task } from "./Task";
import { Category } from "./Category";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  @Min(3)
  user_name!: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  @Min(3)
  email!: string;

  @Column()
  password_hash!: string;

  @Column({
    default: 0,
    type: "int2",
  })
  type!: number;

  @Column({ default: 0, type: "int2" })
  status!: number;

  @OneToMany((type) => Task, (task) => task.owner)
  tasks!: Task[];

  @OneToMany((type) => Category, (category) => category.owner)
  categories!: Category[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
