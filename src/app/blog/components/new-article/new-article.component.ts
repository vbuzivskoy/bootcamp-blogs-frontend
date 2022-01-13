import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { User, UserService } from '../../../auth';
import { trimmedMinLengthValidator } from '../../../common/validators';
import { Article, ArticleService, BlogTitleService } from '../../services';

@Component({
  selector: 'bb-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  user!: User;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  newArticleForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      trimmedMinLengthValidator(5),
    ]),
    description: new FormControl('', [
      Validators.required,
      trimmedMinLengthValidator(5),
    ]),
    text: new FormControl('', [
      Validators.required,
      trimmedMinLengthValidator(10),
    ]),
  });

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private titleService: Title,
    private blogTitleService: BlogTitleService,
    private router: Router
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
    const title = 'New Article';
    this.titleService.setTitle(title);
    this.blogTitleService.setTitle(title);
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
      this.router.navigate(['/article', newArticle.id]);
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
