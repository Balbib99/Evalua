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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AlumnosFormComponent,
    AlumnosListComponent,
    InicioComponent,
    NavigationInicioComponent
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
