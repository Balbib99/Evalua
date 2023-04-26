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

  //Redirige a la página de inicio una vez se registra un profesor
  inicio() {
    return this.router.navigate(['/']);
  }

  //Listamos todos los alumnos a los que da clase un determinado profesor sin tener en cuenta la clase a la
  //que pertenencen
  getAlumnos() {
    return this.http.get(`${this.API_URI}/alumnos/listar`);
  }

  //Recoge los datos del profesor que se va a registrar y se los manda a la sentencia sql que hace
  //posible ese registro
  registarUser(user:any){
    return this.http.post(`${this.API_URI}/registrarUser`,user);
  }

  //Busca los datos de usuario dentro de la BBDD para comprabar que el mismo se está logueando correctamente
  getUser(user:any) {
    return this.http.post(`${this.API_URI}/validarUser`,user);
  }

  //Una vez el programa comprueba que el usuario se ha logueado correctamente, nos redirije a su página
  //de cursos
  logueo(){
    return this.router.navigate(['/cursos']);
  }

  //Cuando seleccionamos un curso, esta función nos redirije a las asignaturas que se imparten en esa clase
  irAlumnosCurso(){
    return this.router.navigate(['/alumnos-curso']);
  }

  //Nos mustra los alumnos que hay en una determinada clase
  getAlumnosCurso(user:any){
    return this.http.post(`${this.API_URI}/alumnos/alumnos-curso`,user);
  } 

  //Se obtienen los cursos a los que da clase un determinado profesor
  getCursos(user:any){
    return this.http.post(`${this.API_URI}/obtenerCursos`,user);
  }

  //Recoge los datos del alumno que queremos registrar en una determinada clase, y se los manda a la sentencia
  //sql que hace posible ese registro
  createAlumno(user:any){
    return this.http.post(`${this.API_URI}/alumnos/crearAlumnos`, user);
  }

  getIdProfesor(user:any){
    return this.http.post(`${this.API_URI}/getIdProfesor`, user);
  }

  crearCurso(curso:any){
    return this.http.post(`${this.API_URI}/crearCurso`, curso);
  }

  createSubject(subject:any){
    return this.http.post(`${this.API_URI}/createSubject`, subject);
  }

  getSubjects(subject:any){
    return this.http.post(`${this.API_URI}/getSubjects`,subject);
  }

  califications(){
    return this.router.navigate(['/calificaciones']);
  }

  createTableCalifications(table:any){
    return this.http.post(`${this.API_URI}/createTableCalifications`,table);
  }

  writeTableCalifications(content:any){
    return this.http.post(`${this.API_URI}/writeTableCalifications`,content);
  }
}
