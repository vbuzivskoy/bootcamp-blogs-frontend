import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services';

import { DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN } from '../../../common/consts';
import { Article, ArticleService, BlogTitleService } from '../../services';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article?: Article;
  isLikedByUser?: boolean;

  isLoading: boolean = true;

  constructor(
    @Inject(DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN)
    public defaultUserAvatarUrl: string,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private blogTitleSerive: BlogTitleService,
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    const id = this.route.snapshot.paramMap.get('id')!;
    this.articleService.getArticleById(id).subscribe((article) => {
      if (!article) {
        this.router.navigateByUrl('/404');
      }

      this.article = article;
      this.articleService
        .isArticleLikedByUser(article)
        .subscribe((isArticleLikedByUser) => {
          this.isLikedByUser = isArticleLikedByUser;

          this.titleService.setTitle(this.article!.title);
          this.blogTitleSerive.setTitle(this.article!.title);
          this.isLoading = false;
        });
    });
  }

  onLikedByClicked() {
    if (this.authService.isLoggedIn() && this.article?.id) {
      this.articleService
        .toggleVote(this.article.id)
        .subscribe((likedByUsers) => {
          this.article!.likedBy = likedByUsers;
          this.isLikedByUser = !this.isLikedByUser;
        });
    }
  }
}
