import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

import { Article, ArticleFormData } from './article.interface';
import { ArticleService } from './article.service';
import { User } from './user';
import { UserService } from './user.service';
import { trimmedMinLengthValidator } from '../common/validators';

@Component({
  selector: 'bb-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  user!: User;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  newArticleForm = new FormGroup({
    title: new FormControl('', [Validators.required, trimmedMinLengthValidator(5)]),
    description: new FormControl('', [Validators.required, trimmedMinLengthValidator(5)]),
    text: new FormControl('', [Validators.required, trimmedMinLengthValidator(10)]),
  });

  constructor(
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  get title() {
    return this.newArticleForm.get('title');
  }

  get description() {
    return this.newArticleForm.get('description');
  }

  get text() {
    return this.newArticleForm.get('text');
  }

  getTitleFieldValidationErrorMessage() {
    if (this.title?.errors?.['required']) {
      return 'Title is required';
    }
    if (this.title?.errors?.['trimmedMinLength']) {
      return 'Title must be at least 5 characters long';
    }

    return '';
  }

  getDescriptionFieldValidationErrorMessage() {
    if (this.description?.errors?.['required']) {
      return 'Description is required';
    }
    if (this.description?.errors?.['trimmedMinLength']) {
      return 'Description must be at least 5 characters long';
    }

    return '';
  }

  getTextFieldValidationErrorMessage() {
    if (this.text?.errors?.['required']) {
      return 'Text is required';
    }
    if (this.text?.errors?.['trimmedMinLength']) {
      return 'Text must be at least 10 characters long';
    }

    return '';
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  onSubmit() {
    if (this.newArticleForm.valid) {
      const newArticleData: Article = {
        title: (this.title?.value as string).trim(),
        description: (this.description?.value as string).trim(),
        text: (this.text?.value as string).trim(),
        createdAt: new Date(),
        author: this.user,
        likedBy: [],
        tags: this.tags,
      };
      const newArticle = this.articleService.createArticle(newArticleData);
      console.log('New article successfully saved:', newArticle);
    }
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
