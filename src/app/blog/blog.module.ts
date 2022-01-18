import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared';
import { blogRoutes } from './blog-routes';
import {
  ArticleComponent,
  ArticleListComponent,
  ArticleListItemComponent,
  BlogComponent,
  LikedByComponent,
  NewArticleComponent,
  TagCloudComponent,
} from './components';
import { ArticleService, BlogTitleService, TagService } from './services';

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
  providers: [ArticleService, TagService, BlogTitleService],
})
export class BlogModule {}
