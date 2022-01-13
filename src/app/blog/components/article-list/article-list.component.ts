import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Article, ArticleService, BlogTitleService } from '../../services';

@Component({
  selector: 'bb-article-list',
  templateUrl: './article-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private blogTitleService: BlogTitleService,
    private articleService: ArticleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const title = 'Blogs';
    this.titleService.setTitle(title);
    this.blogTitleService.setTitle(title);

    this.route.queryParams.subscribe((queryParams) => {
      this.isLoading = true;
      this.cdr.detectChanges();

      this.articleService
        .getArticles(queryParams)
        .subscribe((articles: Article[]) => {
          this.articles = articles;
          this.isLoading = false;
          this.cdr.detectChanges();
        });
    });
  }
}
