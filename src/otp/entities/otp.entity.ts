/* eslint-disable */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  otp: string;

  @Column()
  createdAt: Date;

  @Column()
  expiresAt: Date;
}
