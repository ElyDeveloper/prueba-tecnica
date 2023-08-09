import { Component, ElementRef, Renderer2, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/interfaces/task';
import { SharedDataService } from 'src/app/services/shared-data.service';

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
    estado: new FormControl('', Validators.required),
  });

  private readonly _sharedDataService = inject(SharedDataService);

  // private el: ElementRef, private renderer: Renderer2

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  ngOnInit() {
    this.suscribirse();
  }

  addTask() {
    console.log('Formulario: ', this.taskForm.value);
  }

  suscribirse() {
    this._sharedDataService.tareaSeleccionada$.subscribe((tarea) => {
      this.tareaSeleccionada = tarea;
      console.log('Tarea seleccionada en formulario: ', tarea);
      this.editarTarea();
    });
  }

  editarTarea() {
    if (this.tareaSeleccionada) {
      this.taskForm.patchValue({
        nombre: this.tareaSeleccionada.Nombre,
        descripcion: this.tareaSeleccionada.DescripcionTarea,
        prioridad: this.tareaSeleccionada.Prioridad,
        estado: this.tareaSeleccionada.Estado == true ? '1' : '0',
      });

    }
  }
}
