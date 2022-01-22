import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { DropOutDialogComponent } from '../../../common/components';
import { imageUrlRegex } from '../../../common/consts';
import { OnDropOut } from '../../../common/interfaces';
import { UserParams } from '../../interfaces';
import { UserService } from '../../services';

@Component({
  selector: 'bb-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDropOut {
  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    avatarUrl: new FormControl('', [Validators.pattern(imageUrlRegex)]),
  });

  title = 'Sign Up';
  errorMessage: string | null = null;
  isLeaveDialogShown = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private titleService: Title,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get avatarUrl() {
    return this.signUpForm.get('avatarUrl');
  }

  getFirstNameFieldValidationErrorMessage() {
    if (this.firstName?.errors?.['required']) {
      return 'First name is required';
    }

    return '';
  }
  getLastNameFieldValidationErrorMessage() {
    if (this.lastName?.errors?.['required']) {
      return 'Last name is required';
    }

    return '';
  }

  getEmailFieldValidationErrorMessage() {
    if (this.email?.errors?.['required']) {
      return 'E-mail is required';
    }
    if (this.email?.errors?.['email']) {
      return 'E-mail should be valid';
    }

    return '';
  }

  getPasswordFieldValidationErrorMessage() {
    if (this.password?.errors?.['required']) {
      return 'Password is required';
    }
    if (this.password?.errors?.['minlength']) {
      return 'Password should contain at least 8 characters';
    }

    return '';
  }

  getAvatarUrlFieldValidationErrorMessage() {
    if (this.avatarUrl?.errors?.['pattern']) {
      return 'Should contain a valid URL to an image in the formats: JPG, PNG or SVG';
    }

    return '';
  }

  signUp() {
    if (this.signUpForm.valid) {
      const newUserParams: UserParams = {
        firstName: (this.firstName?.value as string).trim(),
        lastName: (this.lastName?.value as string).trim(),
        email: this.email?.value as string,
        password: this.password?.value as string,
      };

      if (this.avatarUrl?.value) {
        newUserParams.avatarUrl = this.avatarUrl?.value as string;
      }

      this.userService.createUser(newUserParams).subscribe({
        next: () => {
          this.router.navigate(['/signin']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to sign up';
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  onFormClick() {
    this.errorMessage = null;
  }

  onDropOut(): Observable<boolean> {
    if (this.signUpForm.pristine) {
      return of(true);
    }

    const shouldLeaveObservable = new EventEmitter<boolean>();

    const dialogRef = this.dialog.open(DropOutDialogComponent, {
      data: { message: `Leave without saving user's data?` },
    });

    dialogRef.afterClosed().subscribe((shouldLeave = false) => {
      shouldLeaveObservable.emit(shouldLeave);
    });

    return shouldLeaveObservable;
  }
}
