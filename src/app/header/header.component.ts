import { Component } from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {KeycloakService} from "keycloak-angular";
import {NavigationEnd, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgClass
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentRoute: string = '';
  keycloakService: KeycloakService;

  constructor(private keycloak: KeycloakService, private router: Router) {
    this.keycloakService = keycloak;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    })
  }

  public logout() {
    this.keycloakService.logout('http://localhost:4200');

  }

}
