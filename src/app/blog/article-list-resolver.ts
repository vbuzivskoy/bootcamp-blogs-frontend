import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Article } from './services/article.interface';
import { ArticleService } from './services/article.service';

@Injectable()
export class ArticleListResolver implements Resolve<Article[]> {
  constructor(private articleService: ArticleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.articleService.getArticles(route.queryParams);
  }
}
