import { Component, Inject, Input, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/services';
import { DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN } from '../../../common/consts';
import { Article, ArticleService } from '../../services';

@Component({
  selector: 'bb-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss'],
})
export class ArticleListItemComponent implements OnInit {
  @Input() article!: Article;
  isLikedByUser?: boolean;

  constructor(
    @Inject(DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN)
    public defaultUserAvatarUrl: string,
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.articleService
      .isArticleLikedByUser(this.article)
      .subscribe((isArticleLikedByUser) => {
        this.isLikedByUser = isArticleLikedByUser;
      });
  }

  onLikedByClicked() {
    if (this.authService.isLoggedIn()) {
      this.articleService
        .toggleVote(this.article.id!)
        .subscribe((likedByUsers) => {
          this.article.likedBy = likedByUsers;
          this.isLikedByUser = !this.isLikedByUser;
        });
    }
  }
}
