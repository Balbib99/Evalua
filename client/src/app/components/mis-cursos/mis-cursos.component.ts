import { Component } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';

import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.css']
})
export class MisCursosComponent {
  
  cursos: any = [];
  

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
  
}


