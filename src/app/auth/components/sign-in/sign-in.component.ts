import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services';

@Component({
  selector: 'bb-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

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
    this.errorMessage = null;
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
}
