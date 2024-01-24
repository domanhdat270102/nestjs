/* eslint-disable */
import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventFilterDto } from './dto/get-event-filter.dto';

@Injectable()
export class EventRepository extends Repository<Event> {
  constructor(private dataSource: DataSource) {
    super(Event, dataSource.createEntityManager());
  }

  async getEvent(filterDto: GetEventFilterDto): Promise<Event[]> {
    const { search, status, sortBy, page, limit } = filterDto;
    const query = this.createQueryBuilder('event');
    

    if (status) {
      query.andWhere('event.status = :status', { status });
    }

    if (sortBy) {
      const [sortField, sortOrder] = sortBy.split(':');
      
      if (['ASC', 'DESC'].includes(sortOrder.toUpperCase())) {
        query.orderBy(`event.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
      } else {
        throw new BadRequestException('Invalid sortOrder value. Use "ASC" or "DESC".');
      }
    } else {
      // Default sorting by createdAt in descending order
      query.orderBy('event.id', 'ASC');
    }

    if (page && limit) {
      const skip = (+page - 1) * +limit;
      query.skip(skip).take(+limit);
    }
    const events = await query.getMany();
    return events;
  }

  async createEvent(
    createEventDto: CreateEventDto,
    user: User,
  ): Promise<Event> {
    const { describe, name, photo, vid } = createEventDto;

    const festival = this.create({
      describe,
      name,
      photo,
      vid,
    });

    await this.save(festival);
    return festival;
  }
}
