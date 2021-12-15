import { Component, Inject, Input, OnInit } from '@angular/core';

import { DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN } from '../common/consts';
import { Article } from './article.interface';
import { UserId } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'bb-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.css'],
})
export class ArticleListItemComponent implements OnInit {
  @Input() article!: Article;
  userId?: UserId;

  constructor(
    @Inject(DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN)
    public defaultUserAvatarUrl: string,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    this.userId = currentUser?.id;
  }

  onLikedByClicked() {
    if (this.userId) {
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
