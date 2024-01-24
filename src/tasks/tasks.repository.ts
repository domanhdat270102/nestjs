/* eslint-disable */
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-task-filters.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status, sortBy, page, limit } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({user})

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }
    if (sortBy) {
      const [sortField, sortOrder] = sortBy.split(':');
      
      if (['ASC', 'DESC'].includes(sortOrder.toUpperCase())) {
        query.orderBy(`task.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
      } else {
        throw new BadRequestException('Invalid sortOrder value. Use "ASC" or "DESC".');
      }
    } else {
      // Default sorting by createdAt in descending order
      query.orderBy('task.title', 'ASC');
    }

    if (page && limit) {
      const skip = (+page - 1) * +limit;
      query.skip(skip).take(+limit);
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }
}
