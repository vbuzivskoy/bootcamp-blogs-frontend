import { Routes } from '@angular/router';

import {
  ArticleComponent,
  ArticleListComponent,
  BlogComponent,
  NewArticleComponent,
} from './components';
import { CanCreateNewArticleGuard } from './guards';

export const blogRoutes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: ArticleListComponent,
      },
      {
        path: 'add',
        component: NewArticleComponent,
        canActivate: [CanCreateNewArticleGuard],
      },
      {
        path: ':id',
        component: ArticleComponent,
      },
    ],
  },
];
