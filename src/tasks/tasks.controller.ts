import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Task } from './models/task';

@Controller('tasks')
export class TasksController {
  tabTasks = [];

  @Get('all')
  getAllTasks(@Req() request: Request, @Res() response: Response) {
    console.log(request);
    return response.status(200).json({ alltasks: this.tabTasks });
  }

  //   @Get('all/:id/:prenom/:age')
  //   getTaskById(@Param('id') i, @Param('age') a, @Res() response: Response) {
  //     console.log(i, a);
  //   }

  @Get('all/:id')
  getTaskById(@Param('id') taskId, @Res() response: Response) {
    console.log(typeof taskId);

    let selectedTask = this.tabTasks.find((t) => t.id === +taskId);
    if (selectedTask) {
      return response.status(200).json({ result: selectedTask });
    } else throw new NotFoundException("Le task demandé n'existe pas");
  }

  @Post('new')
  addNewTask(@Body() newTask: Task, @Res() response: Response) {
    const { title, desc, statut } = newTask;
    console.log(newTask instanceof Task);

    if (!this.tabTasks.length) {
      let uTask = new Task(1, title, desc, statut);
      this.tabTasks.push(uTask);
    } else {
      let uTask = new Task(
        this.tabTasks[this.tabTasks.length - 1].id + 1,
        title,
        desc,
        statut,
      );
      this.tabTasks.push(uTask);
    }
    return response.status(201).json({ message: 'Ajout réussi du task' });
  }

  @Post('new0')
  addNewTaskV0(@Body() newTask: Task, @Res() response: Response) {
    if (!this.tabTasks.length)
      this.tabTasks.push({
        id: 1,
        ...newTask,
      });
    else {
      this.tabTasks.push({
        id: this.tabTasks[this.tabTasks.length - 1].id + 1,
        ...newTask,
      });
    }
    return response.status(201).json({ message: 'Ajout réussi du task' });
  }

  @Post('new1')
  addNewTaskV1(@Body('desc') descNewTask, @Body('statut') statutNewTask) {
    console.log(descNewTask, statutNewTask);
  }
}
