import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {HeaderComponent} from "./header/header.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {ImprintComponent} from "./imprint/imprint.component";
import {KeycloakService} from "keycloak-angular";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, HeaderComponent, LandingPageComponent, ImprintComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aardearon';
}

