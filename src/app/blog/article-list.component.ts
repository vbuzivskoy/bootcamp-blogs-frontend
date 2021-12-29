import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from './article.interface';
import { BlogTitleService } from './blog-title.service';

@Component({
  selector: 'bb-article-list',
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit {
  articles?: Article[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private blogTitleService: BlogTitleService
  ) {}

  ngOnInit(): void {
    this.articles = this.route.snapshot.data['articles'];
    const title = 'Blogs';
    this.titleService.setTitle(title);
    this.blogTitleService.setTitle(title);

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
