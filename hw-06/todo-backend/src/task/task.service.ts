import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findByTitle(title: string): Promise<Task[]> {
    return this.taskRepository.find({ where: { title: Like(`${title}%`) } });
  }

  async markTask(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({id});
    if (task) {
      task.done = !task.done;
      return this.taskRepository.save(task);
    }
    return null;
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

}
