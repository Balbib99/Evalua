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

  ngOnInit() {
    this.alumnosService.getAlumnos().subscribe(
      res => {
        this.alumnos = res;
      },
      err => console.log(err)
    );
  }
}
