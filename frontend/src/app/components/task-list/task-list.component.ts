import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {

  tasks: Task[] = [];

  private readonly _tasksService = inject(TasksService);
  private readonly _sharedDataService = inject(SharedDataService);

  ngOnInit(): void {
    this.getTasks();
  }

  deleteTask(idTask: number) {
    console.log(' Id de la tarea: ', idTask);
  }

  getTasks() {
    console.log('Obteniendo tareas');
    this._tasksService.getTasks().subscribe((response) => {
      this.tasks = response;
      console.log('Tareas obtenidas: ', response);
    });
  }

  editTask(task: Task) {
    this._sharedDataService.actualizarTareaSeleccionada(task);
  }
}
