import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../auth';
import { trimmedMinLengthValidator } from '../../../common/validators';
import {
  Article,
  ArticleService,
  BlogTitleService,
  Tag,
  TagService,
} from '../../services';

@Component({
  selector: 'bb-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  user!: User;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];

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
    private tagService: TagService,
    private authService: AuthService,
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
    this.authService.getCurrentUser().subscribe((user: User) => {
      this.user = user;
    });
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
      this.articleService
        .createArticle(newArticleData)
        .subscribe((newArticle) => {
          this.router.navigate(['/article', newArticle.id]);
        });
    }
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tagService.getTagByName(value).subscribe({
        next: (tag) => {
          if (!this.tags.map(({ id }) => id).includes(tag.id)) {
            this.tags.push(tag);
          }
          event.chipInput!.clear();
        },
        error: () => {
          this.tagService.createTag(value).subscribe({
            next: (tag) => {
              this.tags.push(tag);
              event.chipInput!.clear();
            },
            error: () => {
              event.chipInput!.clear();
            },
          });
        },
      });
    }

    event.chipInput!.clear();
  }

  removeTag(tagId: string): void {
    const index = this.tags.map(({ id }) => id).indexOf(tagId);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
