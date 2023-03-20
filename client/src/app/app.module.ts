import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AlumnosFormComponent } from './components/alumnos-form/alumnos-form.component';
import { AlumnosListComponent } from './components/alumnos-list/alumnos-list.component';

import { AlumnosService } from './services/alumnos.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AlumnosFormComponent,
    AlumnosListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AlumnosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
