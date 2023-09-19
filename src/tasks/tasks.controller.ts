import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Task } from './models/task';
import { addTaskDTO } from './DTO/addTaskDTO';

@Controller('tasks')
export class TasksController {
  tabTasks = [];

  //   @Get('all')
  //   getAllTasks(@Req() request: Request, @Res() response: Response) {
  //     console.log(request);
  //     return response.status(200).json({ alltasks: this.tabTasks });
  //   }

  //   @Get('all/:id/:prenom/:age')
  //   getTaskById(@Param('id') i, @Param('age') a, @Res() response: Response) {
  //     console.log(i, a);
  //   }

  // Version avec une seule propriété extraite à partir de queryparams
  //   @Get('all')
  //   getAllTasks(@Res() response: Response, @Query('search') qm) {
  //     if (qm) {
  //       const filtredTasks = this.tabTasks.filter((t) =>
  //         t['statut'].includes(qm),
  //       );
  //       return response.status(200).json({ alltasks: filtredTasks });
  //     }
  //     return response.status(200).json({ alltasks: this.tabTasks });
  //   }

  // Version avec tout l'objet queryparams
  @Get('all')
  getAllTasks(@Res() response: Response, @Query() qm) {
    if (qm.search) {
      const filtredTasks = this.tabTasks.filter((t) =>
        t['statut'].includes(qm.search),
      );
      return response.status(200).json({ alltasks: filtredTasks });
    }
    return response.status(200).json({ alltasks: this.tabTasks });
  }

  @Get('all/:id')
  getTaskById(@Param('id', ParseIntPipe) taskId, @Res() response: Response) {
    console.log(typeof taskId);

    let selectedTask = this.tabTasks.find((t) => t.id === taskId);
    if (selectedTask) {
      return response.status(200).json({ result: selectedTask });
    } else throw new NotFoundException("Le task demandé n'existe pas");
  }

  @Post('new')
  addNewTask(@Body() newTask: addTaskDTO, @Res() response: Response) {
    const { title, desc, statut, year } = newTask;
    console.log(newTask instanceof addTaskDTO);

    console.log(newTask);

    if (!this.tabTasks.length) {
      let uTask = new Task(1, title, desc, statut, year);
      this.tabTasks.push(uTask);
    } else {
      let uTask = new Task(
        this.tabTasks[this.tabTasks.length - 1].id + 1,
        title,
        desc,
        statut,
        year,
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

  @Put('edit/:id')
  updateTask(@Body() uTask: Task, @Param('id') uId, @Res() response: Response) {
    let task = this.tabTasks.find((t) => t.id == uId);
    let i = this.tabTasks.indexOf(task);
    task.title = uTask.title;
    task.desc = uTask.desc;
    task.statut = uTask.statut;
    this.tabTasks[i] = task;
    return response.status(200).json({ message: 'Update réussi du task' });
  }

  @Delete('delete/:id')
  deleteTask(@Param('id') dId, @Res() response: Response) {
    //this.tabTasks.filter((t) => t.id != dId);
    let i = this.tabTasks.findIndex((t) => t.id == dId);
    this.tabTasks.splice(i, 1);
    return response.status(200).json({ message: 'Suppression réussi du task' });
  }
}
