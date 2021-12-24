import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared';
import { ArticleListItemComponent } from './article-list-item.component';
import { ArticleListComponent } from './article-list.component';
import { BlogComponent } from './blog.component';
import { LikedByComponent } from './liked-by.component';
import { NewArticleComponent } from './new-article.component';
import { TagCloudComponent } from './tag-cloud.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleListItemComponent,
    LikedByComponent,
    BlogComponent,
    NewArticleComponent,
    TagCloudComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [BlogComponent, NewArticleComponent],
})
export class BlogModule {}
