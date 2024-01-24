/* eslint-disable */
import { Task } from '../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleStatus } from './role-status.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column()
  role: RoleStatus;

  @OneToMany((_type) => Task, (task) => task.user, {eager: true})
  task: Task[]
}
