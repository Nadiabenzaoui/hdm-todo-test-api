import { Injectable } from '@nestjs/common';
import ServiceFactory from '../ServiceFactory';
import DeleteTask from './DeleteTask/DeleteTask';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';
import SaveTaskUseCase from './SaveTask/SaveTaskUseCase';
import EditTask from './EditTask/EditTask';

type UseCases = GetAllTasksUseCase | DeleteTask | SaveTaskUseCase | EditTask;

@Injectable()
export default class UseCaseFactory extends ServiceFactory<UseCases> {}
