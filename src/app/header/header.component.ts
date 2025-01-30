import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {KeycloakService} from "keycloak-angular";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-header',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

  keycloakService: KeycloakService;

  constructor(private keycloak: KeycloakService) {
    this.keycloakService = keycloak;
  }


  public logout() {
    this.keycloakService.logout('http://localhost:4200');

  }

}
