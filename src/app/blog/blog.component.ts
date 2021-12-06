import { Component, OnInit } from '@angular/core';

import { ArticleService } from './article.service';
import { Article } from './article.type';

@Component({
  selector: 'bb-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  articles: Article[] | undefined;
  pageTitle = 'My Blogs';

  user = {
    id: '9c34d115-a13e-43d0-949b-c347a8347fbb',
    firstName: 'Oralle',
    lastName: 'Stanlick',
    avatarUrl: 'https://robohash.org/doloresinducimus.png?size=50x50&set=set1',
  };

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.pageTitle
    this.articles = this.articleService.getArticlesByAuthorId(this.user.id);
  }
}
