import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  API_URI = 'http://localhost:3000';
  LOG_URI = 'http://localhost:4200';

  constructor(private http: HttpClient, private router: Router) { }

  getAlumnos() {
    return this.http.get(`${this.API_URI}/alumnos/listar`);
  }

  getUser(user:any) {
    return this.http.post(`${this.API_URI}/validarUser`,user);
  }

  logueo(){
    return this.router.navigate(['/cursos']);
  }

  registarUser(user:any){
    return this.http.post(`${this.API_URI}/registrarUser`,user);
  }

  getCursos(user:any){
    return this.http.post(`${this.API_URI}/obtenerCursos`,user);
  }
}
