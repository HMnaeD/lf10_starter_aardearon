import {Injectable, OnInit} from "@angular/core";
import {KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class BearerToken implements OnInit{
  token: string = '';

  constructor(private keycloakService: KeycloakService) {
  }
  ngOnInit(): void {
    this.token = this.keycloakService.getToken().toString();
  }
}
