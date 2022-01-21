import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getAuthToken();

    if (authToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
