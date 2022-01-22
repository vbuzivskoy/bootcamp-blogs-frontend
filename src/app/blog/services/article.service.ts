import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService, User } from '../../auth';
import { Article, ArticleSearchParams } from './article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articleApiUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.articleApiUrl = `${environment.apiUrl}/article`;
  }

  getArticles(searchParams: ArticleSearchParams = {}): Observable<Article[]> {
    const httpRequestOptions = {
      params: new HttpParams({
        fromObject: searchParams as { [param: string]: string },
      }),
    };
    return this.http.get<Article[]>(this.articleApiUrl, httpRequestOptions);
  }

  getArticleById(articleId: string): Observable<Article> {
    return this.http.get<Article>(`${this.articleApiUrl}/${articleId}`);
  }

  createArticle(newArticleData: Article): Observable<Article> {
    const httpRequestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Article>(
      this.articleApiUrl,
      newArticleData,
      httpRequestOptions
    );
  }

  toggleVote(articleId: string): Observable<User[]> {
    return this.http.patch<User[]>(
      `${this.articleApiUrl}/${articleId}/toggle-like`,
      null
    );
  }

  isArticleLikedByUser(article: Article): Observable<boolean> {
    if (!this.authService.isLoggedIn()) {
      return of(false);
    }

    return this.authService.getCurrentUser().pipe(
      map((currentUser) => {
        return article.likedBy.map(({ id }) => id).includes(currentUser.id);
      })
    );
  }
}
