import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { countBy, flatten } from 'lodash';
import { map, Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User, UserService } from '../../auth';
import { Article, ArticleSearchParams } from './article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articles: Article[] = [];
  private articleApiUrl: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.articleApiUrl = `${environment.apiUrl}/article`;
  }

  getArticles(searchParams: ArticleSearchParams = {}): Observable<Article[]> {
    const httpRequestOptions = {
      params: new HttpParams({
        fromObject: searchParams as { [param: string]: string },
      }),
    };
    return this.http.get<Article[]>(this.articleApiUrl, httpRequestOptions);

    // let filteredArticles = this.articles;
    // if (searchParams.author) {
    //   filteredArticles = filteredArticles.filter(
    //     (article) => article.author.id === searchParams.author
    //   );
    // }

    // if (searchParams.tag) {
    //   filteredArticles = filteredArticles.filter((article) =>
    //     article.tags.includes(searchParams.tag!)
    //   );
    // }

    // const articlesSubject = new Subject<Article[]>();
    // setTimeout(() => {
    //   articlesSubject.next(filteredArticles);
    //   articlesSubject.complete();
    // }, 1000);

    // return articlesSubject;
  }

  getArticleById(articleId: string): Observable<Article> {
    return this.http.get<Article>(`${this.articleApiUrl}/${articleId}`);
    // return of(this.articles.find((article) => article.id === articleId));
  }

  createArticle(newArticleData: Article): Observable<Article> {
    const httpRequestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.userService.getAuthToken()}`,
      }),
    };
    return this.http.post<Article>(
      this.articleApiUrl,
      newArticleData,
      httpRequestOptions
    );
    // const id = uuidv4();
    // const newArticle: Article = { ...newArticleData, id };
    // this.articles = [...this.articles, newArticle];

    // return newArticle;
  }

  // getPopularTags(count: number = 5): string[] {
  //   const allTags = flatten(this.articles.map(({ tags }) => tags));
  //   const tagsCount = countBy(allTags);
  //   const sortedByCountTags = Object.entries(tagsCount)
  //     .sort(([, countA], [, countB]) => countB - countA)
  //     .map(([tag]) => tag);

  //   return sortedByCountTags.slice(0, count);
  // }

  toggleVote(articleId: string): Observable<User[]> {
    const httpRequestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.userService.getAuthToken()}`,
      }),
    };
    return this.http.patch<User[]>(
      `${this.articleApiUrl}/${articleId}/toggle-like`,
      null,
      httpRequestOptions
    );
  }

  isArticleLikedByUser(article: Article): Observable<boolean> {
    return this.userService.getCurrentUser().pipe(
      map((currentUser) => {
        return article.likedBy.map(({ id }) => id).includes(currentUser.id);
      })
    );
  }
}
