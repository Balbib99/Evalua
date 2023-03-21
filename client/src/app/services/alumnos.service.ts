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

  getUsuario() {
    return this.http.get(`${this.API_URI}/validarUsuario`);
  }

  logueo(){
    return this.router.navigate(['/listar']);
  }
}
