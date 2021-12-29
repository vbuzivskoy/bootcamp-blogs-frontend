import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared';
import { ArticleListItemComponent } from './article-list-item.component';
import { ArticleListResolver } from './article-list-resolver';
import { ArticleListComponent } from './article-list.component';
import { ArticleResolver } from './article-resolver';
import { ArticleComponent } from './article.component';
import { blogRoutes } from './blog-routes';
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
  providers: [ArticleListResolver, ArticleResolver],
})
export class BlogModule {}
