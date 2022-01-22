import { Routes } from '@angular/router';

import {
  ArticleComponent,
  ArticleListComponent,
  BlogComponent,
  NewArticleComponent,
} from './components';
import { CanCreateNewArticleGuard, CanDropOutNewArticle } from './guards';

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
        canDeactivate: [CanDropOutNewArticle],
      },
      {
        path: ':id',
        component: ArticleComponent,
      },
    ],
  },
];
