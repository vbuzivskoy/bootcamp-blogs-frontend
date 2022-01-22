import { Routes } from '@angular/router';

import { SignInComponent, SignUpComponent } from './auth/components';
import { CanSignInGuard, CanSignUpGuard } from './auth/guards';
import { NotFoundComponent } from './errors/not-found.component';

export const appRoutes: Routes = [
  {
    path: 'article',
    loadChildren: () =>
      import('./blog/blog.module').then((module) => module.BlogModule),
  },
  {
    path: '',
    redirectTo: '/article',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SignInComponent,
    canActivate: [CanSignInGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [CanSignUpGuard],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];
