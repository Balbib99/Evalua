import { Component } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent {
  constructor(private alumnosService:AlumnosService){

  }

  ngOnInit(){
    const alumnos = {
      
    }
  }
}
