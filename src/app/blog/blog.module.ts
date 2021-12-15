import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
  ],
  exports: [BlogComponent, NewArticleComponent],
})
export class BlogModule {}
