import { Injectable } from '@nestjs/common';
import { Task } from './models/task';

@Injectable()
export class TasksService {
  tabTasks = [];

  getTasks(qmSearch) {
    if (qmSearch) {
      const filtredTasks = this.tabTasks.filter((t) =>
        t['statut'].includes(qmSearch),
      );
      return filtredTasks;
    }
    return this.tabTasks;
  }

  getTaskById() {}

  addNewTask(newTask) {
    const { title, desc, statut, year } = newTask;

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
  }
}
