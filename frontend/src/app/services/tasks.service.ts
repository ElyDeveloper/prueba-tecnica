import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Task } from '../interfaces/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly apiURL: string = environment.apiURL;

  constructor(private _http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    console.log('La api url es: ', this.apiURL);
    return this._http.get<Task[]>(this.apiURL);
  }

  getTask(id: number) {
    console.log('El id es: ', id);
    return this._http.get(`${this.apiURL}/${id}`);
  }

  addTask(tarea: Task) {
    console.log('La tarea es: ', tarea);
    // Definir las cabeceras
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Realizar la solicitud HTTP con las cabeceras
    return this._http.post<any>(this.apiURL, tarea, { headers });
  }

  editTask(tarea: Task) {
    console.log('La tarea es: ', tarea);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this._http.put<any>(`${this.apiURL}/${tarea.ID}`, tarea, {
      headers,
    });
  }

  deleteTask(id: number) {
    console.log('El id es: ', id);
    return this._http.delete<any>(`${this.apiURL}/${id}`);
  }

  searchTask(texto:string){
    console.log('El texto es: ', texto);
    return this._http.get<Task[]>(`${this.apiURL}/buscar/${texto}`);

  }
}
