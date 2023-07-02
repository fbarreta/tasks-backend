import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult, DeleteResult } from 'typeorm';
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
    return await this.taskRepository.find({
                                              order: {
                                                  description: "ASC"
                                              }
                                          });
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepository.findOne({where:{taskId: id}});
  }

  async findByDescription(searchTxt: string): Promise<Task[]> {
    if (searchTxt) {
      return await this.taskRepository.find({
                                              order: {
                                                description: "ASC"
                                              },
                                              where:{description: Like(`%${searchTxt}%`)}
                                            });
    }
    return await this.taskRepository.find();
  }

  async update(id: number, task: Task): Promise<UpdateResult> {
    return await this.taskRepository.update(id, task);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }

  async removeAll(): Promise<DeleteResult> {
    return await this.taskRepository.createQueryBuilder().delete().execute();
  }
}
