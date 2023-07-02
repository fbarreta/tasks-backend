import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() task: Task) {
    return await this.tasksService.create(task);
  }

  @Get('/search')
  async findByDescription(@Query('searchTxt') searchTxt: string): Promise<Task[]> {
    return await this.tasksService.findByDescription(searchTxt);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() task: Task) {
    return await this.tasksService.update(+id, task);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tasksService.remove(+id);
  }

  @Delete()
  async removeAll() {
    return await this.tasksService.removeAll();
  }
}
