import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

const tasksArray = [
  new Task('task1'),
  new Task('task2'),
  new Task('task3'),
];

const oneTask = new Task('task3');

const taskToUpdate = new Task('Task to Update');

const newTask = new Task('new task');

describe('TasksService', () => {
  let service: TasksService;
  let repo: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
        provide: getRepositoryToken(Task),
        useValue: {
          find: jest.fn().mockResolvedValue(tasksArray),
          findOne: jest.fn().mockResolvedValue(oneTask),
          findByDescription: jest.fn().mockResolvedValue(tasksArray),
          update: jest.fn().mockResolvedValue(taskToUpdate),
          save: jest.fn().mockResolvedValue(newTask),
          delete: jest.fn().mockResolvedValue(true),
          execute: jest.fn().mockResolvedValue(true),
          createQueryBuilder: jest.fn(() => ({
            delete: jest.fn(() => ({
              execute: jest.fn().mockResolvedValue(true),
            })),
          })),
        },
      }],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repo = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all the tasks', async () => {
    const allTasks = await service.findAll();
    expect(allTasks).toEqual(tasksArray);
  });

  it('should return filtered tasks', async () => {
    const filteredTasks = await service.findByDescription('test');
    expect(filteredTasks).toEqual(tasksArray);
  });

  it('should return one the task', async () => {
    const task = await service.findOne(3);
    expect(oneTask).toEqual(task);
  });

  it('should create a task', async () => {
    const task = await service.create(newTask);
    expect(repo.save).toBeCalledTimes(1);
    expect(task).toEqual(newTask);
  });

  it('should update a task', async () => {
    taskToUpdate.taskId = 1;
    taskToUpdate.description = 'new description';
    const task = await service.update(taskToUpdate.taskId, taskToUpdate);
    expect(repo.update).toBeCalledTimes(1);
    expect(task).toEqual(taskToUpdate);
  });

  it('should remove a task', async () => {
    const deleted = await service.remove(1);
    expect(repo.delete).toBeCalledTimes(1);
    expect(deleted).toEqual(true);
  });

  it('should remove all tasks', async () => {
    const deleted = await service.removeAll();
    expect(deleted).toEqual(true);
  });
});
