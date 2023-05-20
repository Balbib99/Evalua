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

  //Permite registrar nuevos usuarios
  registrar(){
    // if (this.tlf.value == '') throw this.tlf.setValue('null');

    const newProf = {
      nombre: this.user.value,
      email: this.email.value,
      clave: this.password.value,
      telefono: this.tlf.value
    }

    if( !(this.password.value === this.verifyPassword.value)){
      let password = document.querySelectorAll('input[type="password"]');
      password.forEach((e: any) => {
        e.style.borderColor = 'red';
      })
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
