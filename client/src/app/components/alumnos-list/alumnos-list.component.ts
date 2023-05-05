import { Component } from '@angular/core';

import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent {

  alumnos: any = [];

  constructor(private alumnosService: AlumnosService) {

  }

  //Devuelve todos los alumnos a los que da clase un profesor, independientemente de la clase
  ngOnInit() {
    this.alumnosService.getAlumnos().subscribe(
      res => {
        this.alumnos = res;
      },
      err => console.log(err)
    );
  }
}
