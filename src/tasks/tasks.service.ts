/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filters.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,

    @InjectRepository(Task)
    private readonly itemRepository: Repository<Task>,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.itemRepository.find()
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: {
        id: id,
        user
      },
    });
    if (!found) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({id, user});

    if (result.affected === 0) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }

  async updateTask(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const {status, search} = filterDto
  //   let tasks = this.getAllTasks()

  //   if(status) {
  //       tasks = tasks.filter(task => task.status === status)
  //   }

  //   if(search) {
  //       tasks = tasks.filter(task => {
  //           if (task.title.includes(search) || task.description.includes(search)) {
  //               return true
  //           }
  //           return false
  //       })
  //   }

  //   return tasks
  // }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);

  //   if (!found) {
  //     throw new NotFoundException(`Task ${id} not found`);
  //   }

  //   return found
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id)
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task
  // }
}
