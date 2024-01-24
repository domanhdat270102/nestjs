/* eslint-disable */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string

  @Column()
  describe: string;

  @Column('simple-array')
  photo: string[];

  @Column()
  vid: string;
}
