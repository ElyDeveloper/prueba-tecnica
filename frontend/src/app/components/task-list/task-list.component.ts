import { Component, inject } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  tasks: Task[] = [];
  searchText: string = '';

  loading: boolean = false;

  timeout: any;

  private readonly _tasksService = inject(TasksService);
  private readonly _sharedDataService = inject(SharedDataService);
  private readonly _toastrService = inject(ToastrService);

  ngOnInit(): void {
    this.setTasks();
    this.getTasks();
  }

  deleteTask(idTask: number) {
    console.log(' Id de la tarea: ', idTask);
    this._tasksService.deleteTask(idTask).subscribe((tarea) => {
      console.log('Tarea eliminada: ', tarea);
      this._toastrService.success('Tarea eliminada con éxito', 'Eliminada');
      this.setTasks();
    });
  }

  search() {
    this.loading = true;
    if (this.timeout != null) {
      this.loading = true;

      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      if (this.searchText == '') {
        this.setTasks();
        this.loading = false;
      } else {
        this._tasksService.searchTask(this.searchText).subscribe((tareas) => {
          this._sharedDataService.actualizarTareas(tareas);
          this.loading = false;
        });
      }
    }, 1500);
  }

  getTasks() {
    this._sharedDataService.tareas$.subscribe((tareas) => {
      this.tasks = tareas;
      console.log('Tareas desde list tareas: ', tareas);
    });
  }

  setTasks() {
    this._tasksService.getTasks().subscribe((tareas) => {
      this._sharedDataService.actualizarTareas(tareas);
    });
  }

  editTask(task: Task) {
    this._sharedDataService.actualizarTareaSeleccionada(task);
  }

  handleChange(task: Task) {
    if (!task.Estado) {
      task.Estado = 1;
    } else {
      task.Estado = 0;
    }

    this._tasksService.editTask(task).subscribe((tarea) => {
      console.log('Tarea editada: ', tarea);
      this.setTasks();
    });
  }

  completeTask(task: Task) {
    if (task.Estado) {
      console.log('Tarea ya completada');
      task.Estado = 0;
    }

    this._tasksService.editTask(task).subscribe((tarea) => {
      console.log('Tarea completada: ', tarea);
      this.setTasks();
    });
  }
}
