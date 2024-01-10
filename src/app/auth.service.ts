// angular-app/src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { KeycloakService, KeycloakOptions } from 'keycloak-angular';
import { keycloakConfig } from '../environments/keycloak.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloakService: KeycloakService) {}

  async initializeKeycloak(): Promise<void> {
    const options: KeycloakOptions = {
      config: keycloakConfig,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
      },
    };

  

    try {
      await this.keycloakService.init(options);
      console.log('Keycloak initialized successfully');

    } catch (error) {
      console.error('Keycloak initialization failed', error);
    }
  }

  async login(): Promise<void> {
    try {
      await this.keycloakService.login({
        redirectUri: window.location.origin 
      });
    } catch (error) {
      console.error('Keycloak login failed', error);
    }
  }

  async doLogout(): Promise<void> {
    await this.keycloakService.logout(window.location.origin);
  }

  getToken(): Promise<string> {
    return this.keycloakService.getToken();
  }
}
