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
    let selectedTask = this.tabTasks.find((t) => t.id == taskId);
    if (selectedTask) {
      return response.status(200).json({ result: selectedTask });
    } else throw new NotFoundException("Le task demandé n'existe pas");
  }

  @Post('new')
  addNewTask(@Body() newTask, @Res() response: Response) {
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
