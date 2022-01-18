import { Component, Inject, Input, OnInit } from '@angular/core';
import { User } from '../../../auth';

import { DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN } from '../../../common/consts';
import { Article } from '../../services';
import { ArticleService } from '../../services/article.service';

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
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleService
      .isArticleLikedByUser(this.article)
      .subscribe((isArticleLikedByUser) => {
        this.isLikedByUser = isArticleLikedByUser;
      });
  }

  onLikedByClicked() {
    this.articleService
      .toggleVote(this.article.id!)
      .subscribe((likedByUsers) => {
        this.article.likedBy = likedByUsers;
        this.isLikedByUser = !this.isLikedByUser;
      });
  }
}
