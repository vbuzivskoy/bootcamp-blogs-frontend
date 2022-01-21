import { Routes } from '@angular/router';
import { SignInComponent, SignUpComponent } from './auth/components';

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
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];
