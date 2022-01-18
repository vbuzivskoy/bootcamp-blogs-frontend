import { Routes } from '@angular/router';

import {
  ArticleComponent,
  ArticleListComponent,
  BlogComponent,
  NewArticleComponent,
} from './components';

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
      },
      {
        path: ':id',
        component: ArticleComponent,
      },
    ],
  },
];
