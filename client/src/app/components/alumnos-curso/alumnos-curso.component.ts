import { Component, HostListener } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';

import { CookieService } from 'ngx-cookie-service';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-alumnos-curso',
  templateUrl: './alumnos-curso.component.html',
  styleUrls: ['./alumnos-curso.component.css']
})

export class AlumnosCursoComponent {

  // nombre:any = '';
  alumnosCurso: any = [];

  //Variables del formulario de creación de un alumno nuevo
  nombre = new FormControl('');
  apellidos = new FormControl('');
  nombre_Familiar1 = new FormControl('');
  apellidos_Familiar1 = new FormControl('');
  nombre_Familiar2 = new FormControl('');
  apellidos_Familiar2 = new FormControl('');
  direccion = new FormControl('');
  email = new FormControl('');
  telefono1 = new FormControl('');
  telefono2 = new FormControl('');
  observaciones = new FormControl('');

  id_Profesor:any = '';

  //Variables del formulario de creación de una asignatura nueva
  nombreAsignatura = new FormControl('');
  alumnoElegido = new FormControl('');

  alumnosAsignatura: any = [];


  constructor(private alumnosService: AlumnosService,  private cookies:CookieService) {

  }
  

  ngOnInit() {

    const form = document.querySelector('.createAlumno');
    form?.setAttribute('style', 'display: none');

    const formAsignatura = document.querySelector('.createAsignatura');
    formAsignatura?.setAttribute('style', 'display: none');

    const curso = {
      nombre: this.cookies.get('curso'),
      profesor: this.cookies.get('user')
    }

    this.alumnosService.getAlumnosCurso(curso).subscribe(
      res => {
        this.alumnosCurso = res;
      },
      err => console.log(err)
    );

    console.log(this.cookies.get('curso'));
  }

  createAlumno(){
    const form = document.querySelector('.createAlumno');

    if (form?.getAttribute('style') == 'display: none') {
      form?.setAttribute('style', 'display: block');  
    }else{
      form?.setAttribute('style', 'display: none');  
    }

    const profesor = {
      nombre : this.cookies.get('user')
    }

    this.alumnosService.getIdProfesor(profesor).subscribe(
      res => {
        this.id_Profesor = res
        console.log(this.id_Profesor[0].id);
      },
      err => console.log(err)
    )

  }

  sendForm(){

    const newAlumno = {
      nombre : this.nombre.value,
      apellidos : this.apellidos.value,
      nombre_Familiar1 : this.nombre_Familiar1.value,
      apellidos_Familiar1 : this.apellidos_Familiar1.value,
      nombre_Familiar2 : this.nombre_Familiar2.value,
      apellidos_Familiar2 : this.apellidos_Familiar2.value,
      direccion : this.direccion.value,
      email : this.email.value,
      telefono1 : this.telefono1.value,
      telefono2 : this.telefono2.value,
      observaciones : this.observaciones.value,
      curso : this.cookies.get('curso'),
      id_Profesor: this.id_Profesor[0].id
    }

    if( this.nombre.value == ''){
      alert('El nombre del alumno es imprescindible');
    }else{
      this.alumnosService.createAlumno(newAlumno).subscribe(
        res => {
          alert('Alumno '+this.nombre.value+' registrado correctamente en la clase '+this.cookies.get('curso'));
        },
        err => console.log(err)
      )

      const form = document.querySelector('.createAlumno');

      form?.setAttribute('style', 'display: block');

      window.scrollTo(scrollY, 0);

      this.ngOnInit();
    } 
  }

  createAsignatura() {
    const formAsignatura = document.querySelector('.createAsignatura');

    if (formAsignatura?.getAttribute('style') == 'display: none') {
      formAsignatura?.setAttribute('style', 'display: block');  
    }else{
      formAsignatura?.setAttribute('style', 'display: none');  
    }
  }

  onChange($event:any){
    let i = -1;

    if ($event.target.checked == true) {
      this.alumnosAsignatura.push({nombre: $event.target.name, apellidos: $event.target.value})
    }else{

      for (const alum of this.alumnosAsignatura) {
        i++;

        if(alum.nombre == $event.target.name && alum.apellidos == $event.target.value){
          this.alumnosAsignatura.splice(i, 1);
        }
      }

    }

    console.log(this.alumnosAsignatura);
  }


  sendFormAsignaturas() {
    // let alumnos = [];

    // for (const alum of this.alumnosCurso) {
    //   alumnos.push({nombre: alum.Nombre +' '+alum.Apellidos, select: false});
    // }
    // console.log(alumnos);
  }
}
