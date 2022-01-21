import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../auth';
import { AuthService } from '../../../auth/services/auth.service';
import { BlogTitleService, Tag, TagService } from '../../services';

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  user?: User;
  title: string = '';
  popularTags?: Tag[];
  isScreenSmall!: boolean;
  isSidenavOpened: boolean = false;
  isLoading = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private blogTitleService: BlogTitleService,
    private router: Router,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.blogTitleService.getTitle().subscribe((title: string) => {
      this.title = title;
    });

    if (this.authService.isLoggedIn()) {
      this.authService.getCurrentUser().subscribe((user: User) => {
        this.user = user;
      });
    }

    this.tagService.getPopularTags().subscribe((tags) => {
      this.popularTags = tags;
    });
  }

  toggleSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
