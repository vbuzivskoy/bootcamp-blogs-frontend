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

import { User, UserService } from '../../../auth';
import { ArticleService } from '../../services/article.service';
import { BlogTitleService } from '../../services/blog-title.service';

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
  isLoading = true;

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
      console.log('this.router.events.subscribe ~ event', event);

      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          console.log(
            'this.router.events.subscribe ~ this.isLoading',
            this.isLoading
          );
          break;
        }
        default: {
          break;
        }
      }
    });

    this.blogTitleService.getTitle().subscribe((title: string) => {
      this.title = title;
    });

    this.user = this.userService.getCurrentUser();
    this.popularTags = this.articleService.getPopularTags();
  }

  toggleSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
