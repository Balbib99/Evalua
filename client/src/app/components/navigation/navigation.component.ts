import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private alumnosService: AlumnosService, private cookies: CookieService) {

  }

  ngOnInit() {
    const links: any = document.querySelectorAll('ul.menu-list li a');
    const activeLinkKey = 'activeLink';

    links.forEach((link: HTMLAnchorElement) => {
      link.addEventListener('click', function (event: Event) {
        event.preventDefault();

        // Remover clase "active" de todos los enlaces
        links.forEach((link: HTMLAnchorElement) => link.classList.remove('active'));

        // Agregar clase "active" al enlace actual
        this.classList.add('active');

        // Guardar el enlace activo en el almacenamiento local
        const href: any = this.getAttribute('href');
        if (href) {
          localStorage.setItem(activeLinkKey, href);
        }

        // Redireccionar a la URL del enlace
        window.location.href = href;
      });
    });

    // Obtener el enlace activo almacenado en el almacenamiento local
    const activeLink = localStorage.getItem(activeLinkKey);
    if (activeLink) {
      links.forEach((link: HTMLAnchorElement) => {
        if (link.getAttribute('href') === activeLink) {
          link.classList.add('active');
        }
      });
    }
    // Obtener la ruta actual
  const currentPath = window.location.pathname;

  // Comparar la ruta actual con los enlaces y agregar la clase "active" al enlace correspondiente
  links.forEach((link: HTMLAnchorElement) => {
    const href = link.getAttribute('href');
    if (href && href === currentPath) {
      link.classList.add('active');
    }
  });
  }
}
