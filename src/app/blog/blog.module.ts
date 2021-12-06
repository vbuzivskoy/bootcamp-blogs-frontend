import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ArticleListItemComponent } from './article-list-item.component';
import { ArticleListComponent } from './article-list.component';
import { BlogComponent } from './blog.component';
import { LikedByComponent } from './liked-by.component';
import { NewArticleComponent } from './new-article.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleListItemComponent,
    LikedByComponent,
    BlogComponent,
    NewArticleComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [BlogComponent, NewArticleComponent],
})
export class BlogModule {}
