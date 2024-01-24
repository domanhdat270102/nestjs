/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from './event.repository';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.entity';
import { User } from 'src/auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetEventFilterDto } from './dto/get-event-filter.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}

  createEvent(createEventDto: CreateEventDto, user: User): Promise<Event> {
    return this.eventRepository.createEvent(createEventDto, user);
  }

  getEvent(filterDto: GetEventFilterDto): Promise<Event[]> {
    return this.eventRepository.getEvent(filterDto);
  }

  async getTaskByName(name: string): Promise<Event> {
    const found = await this.eventRepository.findOne({
      where: {
        name: name,
      },
    });
    if (!found) {
      throw new NotFoundException(`event ${name} not found`);
    }
    return found;
  }
}
