import {KeycloakService} from "keycloak-angular";
import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";


@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(
    private keycloakService: KeycloakService
  ){

  }

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.keycloakService.isLoggedIn();

    if(!isLoggedIn){
      this.keycloakService.login();
      return false;
    }
    return true;
  }
}
