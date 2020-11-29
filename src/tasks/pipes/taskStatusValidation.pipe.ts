import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
    // create readonly array of allowed status values
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];
    // transform() takes 2 args: value and metadata
    // metadata is not needed now but you can console log it just to see and learn 
    transform(value: any, metadata: ArgumentMetadata) {
        // make sure input is capitalized
        value = value.toUpperCase();
        // run isValid func and if not throw error
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        // check if status is valid by finding index in readonly array
        // if missing it will return -1
        const i = this.allowedStatuses.indexOf(status);

        return i !== -1;
    }
}