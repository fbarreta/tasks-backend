import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(task: Task): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepository.findOne({where:{taskId: id}});
  }

  async update(id: number, task: Task): Promise<UpdateResult> {
    return await this.taskRepository.update(id, task);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }
}
