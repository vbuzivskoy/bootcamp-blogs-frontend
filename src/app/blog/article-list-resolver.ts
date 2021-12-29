import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map } from 'rxjs';

import { Article } from './article.interface';
import { ArticleService } from './article.service';

@Injectable()
export class ArticleListResolver implements Resolve<Article[]> {
  constructor(private articleService: ArticleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.articleService
      .getArticles(route.queryParams)
      .pipe(map((articles) => articles));
  }
}
