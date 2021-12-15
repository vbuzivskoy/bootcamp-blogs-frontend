import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

import { Article } from './article.interface';
import { ArticleService } from './article.service';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'bb-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  articles: Article[] | undefined;
  user: User | undefined;
  pageTitle!: string;
  popularTags: string[] | undefined;
  isScreenSmall!: boolean;
  isSidenavOpened: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.pageTitle;
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.articles = this.articleService.getArticlesByAuthorId(this.user.id);
      this.pageTitle = 'My Blog';
    } else {
      this.articles = this.articleService.getAllArticles();
      this.pageTitle = 'All Blogs';
    }
    this.popularTags = this.articleService.getPopularTags();
  }

  toggleSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
