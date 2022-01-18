import { Article } from './article.interface';

export interface Tag {
  id: string;
  name: string;
  articles: Article[];
}
