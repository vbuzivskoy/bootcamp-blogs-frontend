import { Component, Input } from '@angular/core';

import { Article } from './article.interface';

@Component({
  selector: 'bb-article-list',
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent {
  @Input() articles?: Article[];
}
