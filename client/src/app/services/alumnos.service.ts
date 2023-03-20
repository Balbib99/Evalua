import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAlumnos() {
    return this.http.get(`${this.API_URI}/alumnos/listar`);
  }
}
