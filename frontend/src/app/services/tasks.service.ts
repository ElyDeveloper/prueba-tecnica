import { HttpClient } from '@angular/common/http';
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

  getTasks(): Observable<any[]> {
    console.log('La api url es: ', this.apiURL);
    return this._http.get <any[]>(this.apiURL)
  }
}
