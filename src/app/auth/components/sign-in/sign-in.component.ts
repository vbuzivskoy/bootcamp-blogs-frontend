import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../../services';

@Component({
  selector: 'bb-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  title = 'Sign In';
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  getEmailFieldValidationErrorMessage() {
    if (this.email?.errors?.['required']) {
      return 'E-mail is required';
    }
    if (this.email?.errors?.['email']) {
      return 'E-mail must be valid';
    }

    return '';
  }

  getPasswordFieldValidationErrorMessage() {
    if (this.password?.errors?.['required']) {
      return 'Password is required';
    }

    return '';
  }

  signIn() {
    if (this.signInForm.valid) {
      this.authService
        .signIn(this.email!.value, this.password!.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.errorMessage = error.error?.message || 'Failed to sign in';
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
}
