import { Component, Inject, Input } from '@angular/core';

import { DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN } from '../common/consts';
import { Article } from './article.type';
import { UserId } from './user';

@Component({
  selector: 'bb-article-list-item',
  templateUrl: './article-list-item.component.html',
})
export class ArticleListItemComponent {
  @Input() article!: Article;
  @Input() userId?: UserId;

  constructor(
    @Inject(DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN)
    public defaultUserAvatarUrl: string
  ) {}

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
