import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AlumnosFormComponent } from './components/alumnos-form/alumnos-form.component';
import { AlumnosListComponent } from './components/alumnos-list/alumnos-list.component';

import { AlumnosService } from './services/alumnos.service';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavigationInicioComponent } from './components/navigation-inicio/navigation-inicio.component';

import { CookieService } from 'ngx-cookie-service';
import { MisCursosComponent } from './components/mis-cursos/mis-cursos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AlumnosCursoComponent } from './components/alumnos-curso/alumnos-curso.component';
import { RubricasComponent } from './components/rubricas/rubricas.component';
import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AlumnosFormComponent,
    AlumnosListComponent,
    InicioComponent,
    NavigationInicioComponent,
    MisCursosComponent,
    RegistroComponent,
    AlumnosCursoComponent,
    RubricasComponent,
    CalificacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AlumnosService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
