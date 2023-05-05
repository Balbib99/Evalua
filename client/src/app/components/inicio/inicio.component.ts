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


  constructor(private render2: Renderer2, private alumnosService: AlumnosService, private cookies:CookieService){

  }

  iniciaSesion(){
    this.getUser();
  }

  //Hace una busqueda en la BBDD del usuario que está iniciando sesión para comprobar que existe
  getUser(){

    const user = {
      correo: this.email.value,
      clave: this.password.value
    };

    this.alumnosService.getUser(user).subscribe(
      res => {
        if(res == this.password.value){
          
          this.cookies.set('user', `${this.email.value}`);

          console.log('Usuario correcto');

          this.alumnosService.logueo();
        }else{
          console.log('Usuario incorrecto');
        }

      },
      err => console.log('Usuario no verificado')
    );
  }
  
}
