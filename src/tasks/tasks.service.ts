import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks = ['test'];

    getAllTasks() {
        return this.tasks;
    }
}
