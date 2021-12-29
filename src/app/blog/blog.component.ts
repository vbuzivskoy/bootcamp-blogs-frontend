import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

import { ArticleService } from './article.service';
import { BlogTitleService } from './blog-title.service';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  user: User | undefined;
  title: string = '';
  popularTags: string[] | undefined;
  isScreenSmall!: boolean;
  isSidenavOpened: boolean = false;
  isLoading = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private articleService: ArticleService,
    private userService: UserService,
    private blogTitleService: BlogTitleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.blogTitleService.getTitle().subscribe((title) => {
      this.title = title;
    });

    this.user = this.userService.getCurrentUser();
    this.popularTags = this.articleService.getPopularTags();
  }

  toggleSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
