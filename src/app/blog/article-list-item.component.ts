import { Component, Input } from '@angular/core';

import { Article, UserId } from './article.type';
import { defaultUserAvatarUrl } from '../common/consts';

@Component({
  selector: 'bb-article-list-item',
  templateUrl: './article-list-item.component.html',
})
export class ArticleListItemComponent {
  @Input() article!: Article;
  @Input() userId?: UserId;

  defaultUserAvatarUrl: string;

  constructor() {
    this.defaultUserAvatarUrl = defaultUserAvatarUrl;
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
