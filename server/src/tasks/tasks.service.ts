import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {

    const task = this.taskRepository.create({
      ...createTaskDto,
      userId
    })

    return this.taskRepository.save(task);

  }

  async findAll(userId: string, paginationQueryDto: PaginationQueryDto): Promise<[Task[], number]> {

    const { page = 1, limit = 10 } = paginationQueryDto;
    const skip = (page - 1) * limit;

    return this.taskRepository.findAndCount({
      where: { userId },
      skip,
      take: limit,
      order: { createdAt: 'DESC' }
    })

  }

  async findOne(id:string, userId: string): Promise<Task> {

    const task = await this.taskRepository.findOne({
      where: {
        id,
        userId
      }
    })

    if(!task){
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;

  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    const task = await this.findOne(id, userId);

    const updatedTask = {...task, ...updateTaskDto} as Task;
    return this.taskRepository.save(updatedTask);
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

}
