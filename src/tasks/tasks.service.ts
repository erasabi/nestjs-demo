import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/createTaskDto';
import { GetTaskFilterDto } from './dto/getTaskFilterDto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find(task => task.id === id);

        if (!task) {
            // this error will not be caught because we dont have a try catch block
            // so this error will escalate to nestJS 
            // nestJS will recognize the Exception() and handle response
            throw new NotFoundException();
        }

        return task;
    }
    
    getTaskWithFilters(getTaskFilterDto: GetTaskFilterDto): Task[] {
        const { status, search } = getTaskFilterDto;

        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(task => task.status === status );
        }
        if (search) {
            tasks = tasks.filter(
                task => task.title.includes(search) ||
                task.description.includes(search),
            );
        }
        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        const task = this.getTaskById(id);
        this.tasks = this.tasks.filter(t => t.id !== task.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
