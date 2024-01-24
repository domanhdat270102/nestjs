/* eslint-disable */
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { EventDto } from './dto/create-festival.dto';

// @Entity()
// export class Festival {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   banner: string;

//   @Column()
//   description: string;

//   @Column()
//   video: string;

//   @Column('simple-array')
//   image: string[];

//   @Column('simple-array')
//   artist: string[];

//   @Column('simple-array')
//   date: string[];

//   @Column('simple-array')
//   event: string[];

//   @Column('simple-array')
//   donors: string[];
// }


import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EventDto } from './dto/create-festival.dto';

@Entity()
export class Festival {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  banner: string;

  @Column()
  description: string;

  @Column()
  video: string;

  @Column('simple-array')
  image: string[];

  @Column('simple-array')
  artist: string[];

  @Column('simple-array')
  date: string[];

  @Column({ type: 'jsonb' })
  event: EventDto[];

  @Column('simple-array')
  donors: string[];
}
