import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosCursoComponent } from './components/alumnos-curso/alumnos-curso.component';

import { AlumnosListComponent } from './components/alumnos-list/alumnos-list.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MisCursosComponent } from './components/mis-cursos/mis-cursos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RubricasComponent } from './components/rubricas/rubricas.component';
import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'listar',
    component: AlumnosListComponent
  },
  {
    path: 'cursos',
    component: MisCursosComponent
  },
  {
    path: 'registrarse',
    component: RegistroComponent
  },
  {
    path: 'alumnos-curso',
    component: AlumnosCursoComponent
  },
  {
    path: 'rubricas',
    component: RubricasComponent
  },
  {
    path: 'calificaciones',
    component: CalificacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
