import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/interfaces/task';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  tareaSeleccionada: Task | null = null;

  taskForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    prioridad: new FormControl('', Validators.required),
  });

  isEditar: boolean = false;
  isErrorForm: boolean = false;

  private readonly _sharedDataService = inject(SharedDataService);
  private readonly _taskService = inject(TasksService);
  private readonly _toastrService = inject(ToastrService);

  ngOnInit() {
    this.suscribirse();
  }

  cleanError() {
    this.isErrorForm = false;
  }

  addTask() {
    this.isEditar = false;
    this.taskForm.reset();
    console.log('Formulario: ', this.taskForm.value);
  }

  suscribirse() {
    this._sharedDataService.tareaSeleccionada$.subscribe((tarea) => {
      this.tareaSeleccionada = tarea;
      console.log('Tarea seleccionada en formulario: ', tarea);
      this.editTask();
    });
  }

  addTaskForm() {
    if (this.taskForm.valid) {
      const tarea: Task = {
        Nombre: this.taskForm.value.nombre || '',
        DescripcionTarea: this.taskForm.value.descripcion || '',
        Prioridad: this.taskForm.value.prioridad || '',
      };

      const taskUpdate: Task = {
        ID: this.tareaSeleccionada?.ID || 0,
        Nombre: this.taskForm.value.nombre || '',
        DescripcionTarea: this.taskForm.value.descripcion || '',
        Prioridad: this.taskForm.value.prioridad || '',
        Estado: this.tareaSeleccionada?.Estado ? 1 : 0,
      };

      if (this.isEditar) {
        this._taskService.editTask(taskUpdate).subscribe((res) => {
          console.log('Respuesta desde el Backend: ', res);
          this._toastrService.success('Tarea actualizada con éxito', 'Tarea actualizada');

          this.setTasks();
        });
      } else {
        this._taskService.addTask(tarea).subscribe((res) => {
          console.log('Respuesta desde el Backend: ', res);
          this._toastrService.success('Tarea agregada con éxito', 'Tarea agregada');
          this.setTasks();
        });
      }

      this.taskForm.reset();
      this.isEditar = false;
    } else {
      this.isErrorForm = true;
    }
  }

  editTask() {
    if (this.tareaSeleccionada) {
      this.taskForm.patchValue({
        nombre: this.tareaSeleccionada.Nombre,
        descripcion: this.tareaSeleccionada.DescripcionTarea,
        prioridad: this.tareaSeleccionada.Prioridad,
      });

      this.isEditar = true;
    }
  }

  setTasks() {
    this._taskService.getTasks().subscribe((tareas) => {
      this._sharedDataService.actualizarTareas(tareas);
    });
  }
}
