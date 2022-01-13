import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared';
import {
  ArticleListItemComponent,
  ArticleListComponent,
  ArticleComponent,
  BlogComponent,
  LikedByComponent,
  NewArticleComponent,
  TagCloudComponent,
} from './components';
import { blogRoutes } from './blog-routes';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleListItemComponent,
    LikedByComponent,
    BlogComponent,
    NewArticleComponent,
    TagCloudComponent,
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(blogRoutes),
  ],
  exports: [BlogComponent, NewArticleComponent],
})
export class BlogModule {}
