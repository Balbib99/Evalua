import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private alumnosService: AlumnosService,  private cookies:CookieService) {

  }

  ngOnInit(){

  }
}
