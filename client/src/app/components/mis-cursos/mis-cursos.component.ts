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
  id_Profesor:any = '';
  curso = new FormControl('');
  

  constructor(private alumnosService: AlumnosService,  private cookies:CookieService) {

  }

  ngOnInit() {

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
  }

  cursoSeleccionado(cursoNombre:any){
    
    this.cookies.set('curso', cursoNombre);
    this.alumnosService.irAlumnosCurso();

  }

  crearCurso(){

    const form = document.querySelector('.formulario');

    form?.setAttribute('style', 'visibility: visible');

    const profesor = {
      nombre : this.cookies.get('user')
    }

    this.alumnosService.getIdProfesor(profesor).subscribe(
      res => {
        this.id_Profesor = res
      },
      err => console.log(err)
    )
  }

  sendForm(){
    
    const curso = {
      nombre: this.curso.value,
      id_Profesor: this.id_Profesor[0].id
    }

    this.alumnosService.crearCurso(curso).subscribe(
      res => {
        this.ngOnInit();
      },
      err => console.log(err)
    )
  }
  
}


