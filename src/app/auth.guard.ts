import {KeycloakService} from "keycloak-angular";
import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";


@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ){

  }

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.keycloakService.isLoggedIn();

    if(!isLoggedIn){
      this.keycloakService.login({
          redirectUri: window.location.origin + '/landing-page',
        });
      return false;
    }
    return true;
  }
}
