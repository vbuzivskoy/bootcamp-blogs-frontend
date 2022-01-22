import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root',
})
export class CanCreateNewArticleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
