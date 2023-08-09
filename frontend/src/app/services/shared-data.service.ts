import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private tareaSeleccionadaSource = new BehaviorSubject<Task | null>(null);
  tareaSeleccionada$ = this.tareaSeleccionadaSource.asObservable();

  actualizarTareaSeleccionada(tarea: Task) {
    this.tareaSeleccionadaSource.next(tarea);
  }
}
