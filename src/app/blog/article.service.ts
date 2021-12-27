import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { countBy, flatten } from 'lodash';

import { allArticles } from './article.mock';
import { Article } from './article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articles: Article[] = [];

  constructor() {
    this.articles = allArticles;
  }

  getAllArticles(): Article[] {
    return this.articles;
  }

  getArticlesByAuthorId(authorId: string): Article[] {
    return this.articles.filter((article) => article.author.id === authorId);
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
