import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('tasks')
export class TasksController {
  @Get('all')
  getAllTasks(@Req() request: Request, @Res() response: Response) {
    console.log(request);
    return response.status(200).json({ alltasks: [] });
  }

  @Post('new')
  addNewTask(@Body() newTask) {
    console.log(newTask);
  }

  @Post('new1')
  addNewTaskV1(@Body('desc') descNewTask, @Body('statut') statutNewTask) {
    console.log(descNewTask, statutNewTask);
  }
}
