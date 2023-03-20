import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlumnosListComponent } from './components/alumnos-list/alumnos-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/alumnos',
    pathMatch: 'full'
  },
  {
    path: 'alumnos',
    component: AlumnosListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
