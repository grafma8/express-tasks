import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Task } from "./Task";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id!: number;

  @Column()
  category_name!: string;

  @Column()
  category_type!: number;

  @ManyToOne((type) => User, (owner) => owner.categories, { nullable: false })
  @JoinColumn({ name: "owner_id" })
  owner!: User;

  @ManyToMany((type) => Task)
  tasks?: Task[];

  @ManyToOne((type) => Category, (parent) => parent.children)
  @JoinColumn({ name: "parent_id" })
  parent?: Category;

  @OneToMany((type) => Category, (child) => child.parent)
  children?: Category[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
