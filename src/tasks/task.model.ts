export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

// create in enum to restrict the possible values for status
export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}