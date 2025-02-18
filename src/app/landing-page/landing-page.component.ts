import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  keycloakService: KeycloakService;

  constructor(private keycloak: KeycloakService) {
    this.keycloakService = keycloak;
  }


  public logout() {
    this.keycloakService.logout('http://localhost:4200');

  }
}
