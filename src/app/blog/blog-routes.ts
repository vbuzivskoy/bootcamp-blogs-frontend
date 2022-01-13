import { Routes } from '@angular/router';

import { ArticleResolver } from './article-resolver';
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
        // resolve: {
        //   articles: ArticleListResolver,
        // },
        // runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      {
        path: 'add',
        component: NewArticleComponent,
      },
      {
        path: ':id',
        component: ArticleComponent,
        resolve: {
          article: ArticleResolver,
        },
      },
    ],
  },
];
