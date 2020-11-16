import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { IsEmail, Min } from "class-validator";
import { Exclude } from "class-transformer";
import { Task } from "./Task";
import { Category } from "./Category";
import bcrypt from "bcrypt";

export enum UserType {
  NORMAL = 0,
  ADMIN = 100,
}

export enum UserStatus {
  VERIFYING = 10,
  // RESETTING_PASSWORD = 11,
  ACTIVE = 20,
  CANCELED = 30,
  BANNED = 40,
}

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

  @Exclude()
  @Column()
  password!: string;

  @Column({
    default: UserType.NORMAL,
    type: "int2",
  })
  type!: UserType;

  @Column({ default: UserStatus.VERIFYING, type: "int2" })
  status!: UserStatus;

  @Exclude()
  @Column()
  activation_token!: string;

  @OneToMany((type) => Task, (task) => task.owner)
  tasks!: Task[];

  @OneToMany((type) => Category, (category) => category.owner)
  categories!: Category[];

  @Exclude()
  @CreateDateColumn()
  created_at!: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  _hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 10);
  }

}
