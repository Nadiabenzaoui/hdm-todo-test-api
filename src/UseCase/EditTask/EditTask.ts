import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';
import SaveTaskDto from '../SaveTask/SaveTaskDto';
import { Task } from '@prisma/client';

@Injectable()
export default class EditTask
    implements UseCase<Promise<Task>, [SaveTaskDto]>
{
    constructor(private readonly taskRepository: TaskRepository) {}

    async handle(dto: SaveTaskDto): Promise<Task> {
        try {
            await this.taskRepository.save(dto);

            return dto as Task;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
