import { Component } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';

import { CookieService } from 'ngx-cookie-service';

import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.css']
})
export class MisCursosComponent {

  cursos: any = [];
  id_Profesor: any = '';
  curso = new FormControl('');


  constructor(private alumnosService: AlumnosService, private cookies: CookieService) {

  }

  //Carga los cursos de los que dispone un profesor y deja crear los que el usuario quiera
  ngOnInit() {

    const form = document.querySelector('.formulario');
    form?.setAttribute('style', 'display: none');

    const user = {
      usuario: this.cookies.get('user')
    };

    this.alumnosService.getCursos(user).subscribe(
      res => {
        this.cursos = res;

        console.log(this.cursos);
      },
      err => console.log(err)
    );

    const profesor = {
      nombre: this.cookies.get('user')
    }

    this.alumnosService.getIdProfesor(profesor).subscribe(
      res => {
        this.id_Profesor = res
        localStorage.setItem('id_Profesor', this.id_Profesor[0].id);
      },
      err => console.log(err)
    )
  }

  //Recoge el nombre del curso seleccionado y se dirije al alaprtado de ese curso en concreto
  cursoSeleccionado(cursoNombre: any) {

    this.cookies.set('curso', cursoNombre);
    this.alumnosService.irAlumnosCurso();

  }

  //Permite crear tantos cursos como quiera el usuario
  crearCurso() {

    const form = document.querySelector('.formulario');
    if (form?.getAttribute('style') == 'display: none') {
      form?.setAttribute('style', 'display: block');
    } else {
      form?.setAttribute('style', 'display: none');
    }



    const profesor = {
      nombre: this.cookies.get('user')
    }

    this.alumnosService.getIdProfesor(profesor).subscribe(
      res => {
        this.id_Profesor = res
      },
      err => console.log(err)
    )
  }

  //Envia el formulario de creación del curso para que los datos se guarden en la BBDD
  sendForm() {

    const curso = {
      nombre: this.curso.value,
      id_Profesor: this.id_Profesor[0].id
    }

    this.alumnosService.crearCurso(curso).subscribe(
      res => {
        const form = document.querySelector('.formulario');

        form?.setAttribute('style', 'display: none');
        this.ngOnInit();
      },
      err => console.log(err)
    )
  }

}


