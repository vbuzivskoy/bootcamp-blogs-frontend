import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../../auth/services';
import {
  Article,
  ArticleService,
  BlogTitleService,
  TagService,
} from '../../services';

@Component({
  selector: 'bb-article-list',
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private blogTitleService: BlogTitleService,
    private articleService: ArticleService,
    private userService: UserService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.isLoading = true;

      this.articleService
        .getArticles(queryParams)
        .subscribe((articles: Article[]) => {
          this.articles = articles;

          const userId = queryParams['author'];
          const tagId = queryParams['tag'];
          if (userId) {
            this.userService.getUserById(userId).subscribe((user) => {
              const title = `${user.firstName} ${user.lastName}'s Blog`;
              this.titleService.setTitle(title);
              this.blogTitleService.setTitle(title);

              this.isLoading = false;
            });
          } else if (tagId) {
            this.tagService.getTagById(tagId).subscribe((tag) => {
              const title = `Blogs tagged with "${tag.name}"`;
              this.titleService.setTitle(title);
              this.blogTitleService.setTitle(title);

              this.isLoading = false;
            });
          } else {
            const title = `Blogs`;
            this.titleService.setTitle(title);
            this.blogTitleService.setTitle(title);

            this.isLoading = false;
          }
        });
    });
  }
}
