import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Article } from './services/article.interface';
import { ArticleService } from './services/article.service';

@Injectable()
export class ArticleResolver implements Resolve<Article | undefined> {
  constructor(private articleService: ArticleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    if (id) {
      const article = this.articleService.getArticleById(id);
      if (article) {
        return article;
      }
    }

    this.router.navigateByUrl('/404');
    return;
  }
}
