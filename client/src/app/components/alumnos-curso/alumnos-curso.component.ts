import { Component, HostListener } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-alumnos-curso',
  templateUrl: './alumnos-curso.component.html',
  styleUrls: ['./alumnos-curso.component.css']
})

export class AlumnosCursoComponent {

  nombre:any = '';
  alumnosCurso: any = [];
  constructor(private alumnosService: AlumnosService,  private cookies:CookieService) {

  }

  
  

  ngOnInit() {

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

    form?.setAttribute('style', 'visibility: visible');
  }

  sendForm(){
    const form = document.querySelector('.createAlumno');

    form?.setAttribute('style', 'visibility: hidden');

    window.scrollTo(scrollY, 0);
  }
}
