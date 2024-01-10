// angular-app/src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AuthService } from './app/auth.service';
import { KeycloakService } from 'keycloak-angular';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [KeycloakService, AuthService],
})
  .then((appRef) => {
    const authService = appRef.injector.get(AuthService);
    authService.initializeKeycloak().then(() => {
      console.log('Keycloak initialized');
    });
  })
  .catch((err) => console.error(err));
