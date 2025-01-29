import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {KeycloakService} from "keycloak-angular";

@Component({
    selector: 'app-header',
    imports: [
        NgOptimizedImage
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
