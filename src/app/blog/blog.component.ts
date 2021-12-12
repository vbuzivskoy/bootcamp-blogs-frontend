import { Component, OnInit } from '@angular/core';

import { ArticleService } from './article.service';
import { Article } from './article.type';
import { User } from './user';

@Component({
  selector: 'bb-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  articles: Article[] | undefined;
  user: User;
  pageTitle: string;

  constructor(private articleService: ArticleService) {
    this.user = new User({
      id: '9c34d115-a13e-43d0-949b-c347a8347fbb',
      firstName: 'Oralle',
      lastName: 'Stanlick',
      avatarUrl:
        'https://robohash.org/doloresinducimus.png?size=50x50&set=set1',
    });

    this.pageTitle = 'My Blogs';
  }

  ngOnInit(): void {
    this.pageTitle;
    this.articles = this.articleService.getArticlesByAuthorId(this.user.id);
  }
}
