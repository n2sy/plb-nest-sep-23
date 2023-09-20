import { Injectable, NotFoundException } from '@nestjs/common';
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

  getTaskById(taskId) {
    return this.tabTasks.find((t) => t.id == taskId);
  }

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

  deleteTask(id) {
    let i = this.tabTasks.findIndex((t) => t.id == id);
    if (i == -1)
      return { message: "Le task que vous demandez à supprimer n'existe pas" };
    this.tabTasks.splice(i, 1);
    return { message: 'Task supprimé avec succès' };
  }

  updateTask(uTask, id) {
    let task = this.tabTasks.find((t) => t.id == id);
    if (!task)
      return { message: "Le task que vous demandez à supprimer n'existe pas" };

    let i = this.tabTasks.indexOf(task);
    task.title = uTask.title;
    task.desc = uTask.desc;
    task.statut = uTask.statut;
    this.tabTasks[i] = task;
    return { message: 'Task mis à jour avec succès' };
  }

  changeStatusTask(id, newStatut) {
    console.log(id);

    let t = this.getTaskById(id);
    console.log(t);

    if (!t)
      return { message: "Le task que vous demandez à supprimer n'existe pas" };
    t.statut = newStatut;
    return { message: 'Statut modifié avec succès' };
  }
}
