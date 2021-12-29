import { Routes } from '@angular/router';

import { ArticleListResolver } from './article-list-resolver';
import { ArticleListComponent } from './article-list.component';
import { ArticleResolver } from './article-resolver';
import { ArticleComponent } from './article.component';
import { BlogComponent } from './blog.component';
import { NewArticleComponent } from './new-article.component';

export const blogRoutes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: ArticleListComponent,
        resolve: {
          articles: ArticleListResolver,
        },
        runGuardsAndResolvers: 'always'
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
