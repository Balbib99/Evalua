import { Component, Renderer2 } from '@angular/core';

import { Injectable } from '@angular/core';

import { AlumnosService } from 'src/app/services/alumnos.service';

import { CookieService } from 'ngx-cookie-service';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

@Injectable()
export class RegistroComponent {

  user = new FormControl('');
  password = new FormControl('');
  verifyPassword = new FormControl('');
  email = new FormControl('');
  tlf = new FormControl('');

  constructor(private render2: Renderer2, private alumnosService: AlumnosService, private cookies:CookieService){

  }

  registrar(){
    // if (this.tlf.value == '') throw this.tlf.setValue('null');

    const newProf = {
      nombre: this.user.value,
      email: this.email.value,
      clave: this.password.value,
      telefono: this.tlf.value
    }

    if( !(this.password.value === this.verifyPassword.value)){
      alert('Los campos de contraseña no son iguales');
    }else{
      this.alumnosService.registarUser(newProf).subscribe(
        res => {
          alert('Usuario '+this.user.value+' registrado correctamente');

          this.alumnosService.inicio();
        },
        err => console.log(err)
      );
    }

  }
}
