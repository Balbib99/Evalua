import { Component } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent {
  constructor(private alumnosService:AlumnosService, private cookies:CookieService){

  }

  students:any = []

  ngOnInit(){

    const filtro = {
      id: this.cookies.get('idAsignatura')
    }

    this.alumnosService.getStudentsSubject(filtro).subscribe(
      res => {
        this.students = res;
        this.students = this.students[0].Nombre_alumnos.split(',')
        console.log(this.students)
      },
      err => {}
    )
  }

  createCalification(){
    document.querySelector('dialog')?.showModal();

  }

  backToCalifications(){
    const dialogs = document.querySelectorAll('dialog')

    dialogs[0].close()
  }

  rubricaDialogs(){
    const dialogs = document.querySelectorAll('dialog')
    dialogs[0].close()

    dialogs[1].showModal()
  }

  backToCreateCalification(){
    const dialogs = document.querySelectorAll('dialog')
    dialogs[1].close()

    dialogs[0].showModal()
  }

  rubricaDimensions(){
    const dialogs = document.querySelectorAll('dialog')
    dialogs[1].close()

    dialogs[2].showModal()
  }

  backToRubricaDialogs(){
    const dialogs = document.querySelectorAll('dialog')
    dialogs[2].close()

    dialogs[1].showModal()
  }

  createRubrica(){
    const dialogs = document.querySelectorAll('dialog')
    dialogs[2].close()

    // -------------------------- PROCESO DE CREACIÓN DE LA RUBRICA ------------------------


  }

  close(){
    const dialogs = document.querySelectorAll('dialog')
    dialogs.forEach(element => {
      element.close()
    });
  }
}
