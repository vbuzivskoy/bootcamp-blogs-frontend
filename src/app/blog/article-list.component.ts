import { Component, Input } from '@angular/core';

import { Article, User } from './article.type';

@Component({
  selector: 'bb-article-list',
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent {
  @Input() articles!: Article[];
  @Input() user?: User;
}
