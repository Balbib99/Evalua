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

  ngOnInit(){
    this.cookies.deleteAll()
    localStorage.removeItem('id_Profesor')
    localStorage.removeItem('activeLink')
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
          alert('Usuario no valido')
        }

      },
      err => console.log('Usuario no verificado')
    );
  }
  
}
