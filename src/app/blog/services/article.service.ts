import { Injectable } from '@angular/core';
import { countBy, flatten } from 'lodash';
import { Observable, of, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Article, ArticleSearchParams } from './article.interface';
import { allArticles } from './article.mock';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articles: Article[] = [];

  constructor() {
    this.articles = allArticles;
  }

  getArticles(searchParams: ArticleSearchParams = {}): Observable<Article[]> {
    let filteredArticles = this.articles;
    if (searchParams.author) {
      filteredArticles = filteredArticles.filter(
        (article) => article.author.id === searchParams.author
      );
    }

    if (searchParams.tag) {
      filteredArticles = filteredArticles.filter((article) =>
        article.tags.includes(searchParams.tag!)
      );
    }

    const articlesSubject = new Subject<Article[]>();
    setTimeout(() => {
      articlesSubject.next(filteredArticles);
      articlesSubject.complete();
    }, 1000);

    return articlesSubject;
  }

  getArticleById(articleId: string): Observable<Article | undefined> {
    return of(this.articles.find((article) => article.id === articleId));
  }

  createArticle(newArticleData: Article): Article {
    const id = uuidv4();
    const newArticle: Article = { ...newArticleData, id };
    this.articles = [...this.articles, newArticle];

    return newArticle;
  }

  getPopularTags(count: number = 5): string[] {
    const allTags = flatten(this.articles.map(({ tags }) => tags));
    const tagsCount = countBy(allTags);
    const sortedByCountTags = Object.entries(tagsCount)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([tag]) => tag);

    return sortedByCountTags.slice(0, count);
  }
}
