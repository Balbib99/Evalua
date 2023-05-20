import { Component } from '@angular/core';

import { AlumnosService } from '../../services/alumnos.service';

import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent {

  alumnos: any = [];
  id_Profesor: any = '';

  constructor(private alumnosService: AlumnosService, private cookies: CookieService) {

  }

  //Devuelve todos los alumnos a los que da clase un profesor, independientemente de la clase
  ngOnInit() {

    const profesor = {
      nombre: this.cookies.get('user')
    }

    this.alumnosService.getIdProfesor(profesor).subscribe(
      res => {
        this.id_Profesor = res
        
        localStorage.setItem('id_Profesor', this.id_Profesor[0].id);

        const params = {
          id_Profesor: this.id_Profesor[0].id
        }
        console.log(params);
        
    
        this.alumnosService.getAlumnos(params).subscribe(
          res => {
            this.alumnos = res;
            console.log(res);
            
          },
          err => console.log(err)
        );
        
      },
      err => console.log(err)
    )

    

    
  }
}
