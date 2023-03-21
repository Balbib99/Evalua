import { Component, ViewChild, ElementRef, Renderer2} from '@angular/core';

import { Injectable } from '@angular/core';

import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AlumnosService } from '../../services/alumnos.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

@Injectable()
export class InicioComponent{

  email = new FormControl('');
  password = new FormControl('');

  profesores:any = [];

  constructor(private render2: Renderer2, private alumnosService: AlumnosService, private cookies:CookieService){

  }

  iniciaSesion(){
    const correo = this.email.value;
    const password = this.password.value;

    this.alumnosService.getUsuario().subscribe(
      res => {
        this.profesores = res;
        console.log(this.profesores);

        for (let prof of this.profesores){
          if(prof.Nombre == correo){
            console.log('usuario correcto');

            this.cookies.set('usuario', prof.Nombre);

            this.alumnosService.logueo();
            
          }
        }


      },
      err => console.log('Usuario o contraseña introducidos no validos'),
    );
  }
  
}
