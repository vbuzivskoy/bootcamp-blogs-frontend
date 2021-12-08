import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ArticleService } from './article.service';
import { Article, ArticleFormData } from './article.type';
import { User } from './user';

@Component({
  selector: 'bb-new-article',
  templateUrl: './new-article.component.html',
})
export class NewArticleComponent implements OnInit {
  user: User;

  newArticleData: ArticleFormData = {
    title: '',
    description: '',
    text: '',
    tags: '',
  };
  createArticleError: boolean = false;
  createArticleErrorMessage: string = '';

  constructor(private articleService: ArticleService) {
    this.user = new User({
      id: '9c34d115-a13e-43d0-949b-c347a8347fbb',
      firstName: 'Oralle',
      lastName: 'Stanlick',
      avatarUrl:
        'https://robohash.org/doloresinducimus.png?size=50x50&set=set1',
    });
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newArticleData: Article = {
        title: this.newArticleData.title,
        description: this.newArticleData.description,
        text: this.newArticleData.text,
        tags: this.newArticleData.tags.split(',').map((tag) => tag.trim()),
        createdAt: new Date(),
        author: this.user,
        likedBy: [],
      };
      const newArticle = this.articleService.createArticle(newArticleData);
      console.log('newArticle', newArticle);
    } else {
      this.createArticleError = true;
      this.createArticleErrorMessage = 'Please fix the above errors';
    }
  }
}
