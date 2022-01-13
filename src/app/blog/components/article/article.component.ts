import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN } from '../../../common/consts';
import { Article, ArticleService, BlogTitleService } from '../../services';
import { UserId, UserService } from '../../../auth';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article?: Article;
  userId?: UserId;
  isLoading: boolean = true;

  constructor(
    @Inject(DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN)
    public defaultUserAvatarUrl: string,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private blogTitleSerive: BlogTitleService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    const currentUser = this.userService.getCurrentUser();
    this.userId = currentUser?.id;

    const id = this.route.snapshot.paramMap.get('id')!;
    this.articleService.getArticleById(id).subscribe((article) => {
      this.isLoading = false;
      if (!article) {
        this.router.navigateByUrl('/404');
      }

      this.article = article;
      this.titleService.setTitle(this.article!.title);
      this.blogTitleSerive.setTitle(this.article!.title);
    });
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
