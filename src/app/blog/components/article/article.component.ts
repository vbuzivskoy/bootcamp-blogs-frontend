import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN } from '../../../common/consts';
import { Article, BlogTitleService } from '../../services';
import { UserId, UserService } from '../../../auth';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article?: Article;
  userId?: UserId;

  constructor(
    @Inject(DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN)
    public defaultUserAvatarUrl: string,
    private userService: UserService,
    private route: ActivatedRoute,
    private titleService: Title,
    private blogTitleSerive: BlogTitleService
  ) {}

  ngOnInit(): void {
    this.article = this.route.snapshot.data['article'];

    this.titleService.setTitle(this.article!.title);
    this.blogTitleSerive.setTitle(this.article!.title);

    const currentUser = this.userService.getCurrentUser();
    this.userId = currentUser?.id;
  }

  onLikedByClicked() {
    if (this.userId && this.article) {
      if (this.article.likedBy.includes(this.userId)) {
        this.article.likedBy = this.article.likedBy.filter(
          (userId) => userId !== this.userId
        );
      } else {
        this.article.likedBy = [...this.article.likedBy, this.userId];
      }
    }
  }
}
