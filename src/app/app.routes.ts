import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'protected-route', component: AppComponent, canActivate: [AuthGuard] },
];
