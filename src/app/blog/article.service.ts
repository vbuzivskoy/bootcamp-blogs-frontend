import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { allArticles } from './article.mock';
import { Article } from './article.type';

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
}
