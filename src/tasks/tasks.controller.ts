import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
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
import { UpperandfusionPipe } from 'src/upperandfusion/upperandfusion.pipe';
import { TasksService } from './tasks.service';

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

  constructor(private taskSer: TasksService) {}

  // Version avec tout l'objet queryparams
  @Get('all')
  getAllTasks(@Res() response: Response, @Query() qm) {
    let newTabTasks = this.taskSer.getTasks(qm.search);
    return response.status(200).json({ alltasks: newTabTasks });
  }

  @Get('all/:id')
  getTaskById(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    taskId,
    @Res() response: Response,
  ) {
    let selectedTask = this.taskSer.getTaskById(taskId);
    if (selectedTask) {
      return response.status(200).json({ result: selectedTask });
    } else throw new NotFoundException("Le task demandé n'existe pas");
  }
  // @Post('new0')
  // addNewTaskV0(@Body() newTask: Task, @Res() response: Response) {
  //   if (!this.tabTasks.length)
  //     this.tabTasks.push({
  //       id: 1,
  //       ...newTask,
  //     });
  //   else {
  //     this.tabTasks.push({
  //       id: this.tabTasks[this.tabTasks.length - 1].id + 1,
  //       ...newTask,
  //     });
  //   }
  //   return response.status(201).json({ message: 'Ajout réussi du task' });
  // }

  @Post('new')
  addNewTask(
    @Body() newTask: addTaskDTO,
    @Res() response: Response,
    @Headers() headers: Headers,
  ) {
    this.taskSer.addNewTask(newTask);
    return response.status(201).json({ message: 'Ajout réussi du task' });
  }

  // @Post('new1')
  // addNewTaskV1(@Body('desc') descNewTask, @Body('statut') statutNewTask) {
  //   console.log(descNewTask, statutNewTask);
  // }

  @Put('edit/:id')
  updateTask(@Body() uTask, @Param('id') uId, @Res() response: Response) {
    return response.status(200).json(this.taskSer.updateTask(uTask, uId));
  }

  @Delete('edit/:id')
  deleteTask(@Param('id') dId, @Res() response: Response) {
    return response.status(200).json(this.taskSer.deleteTask(dId));
  }

  @Patch('edit/statut/:id')
  patchHandler(@Param('id') id, @Body() uTask, @Res() response: Response) {
    return response
      .status(200)
      .json(this.taskSer.changeStatusTask(id, uTask['statut']));
  }

  /***************** */

  @Post('testpipe')
  testPipe(@Body(UpperandfusionPipe) data) {
    return data;
  }
}
