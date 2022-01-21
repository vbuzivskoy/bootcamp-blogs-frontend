import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { signInResponse } from '../interfaces';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userApiUrl: string;
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {
    this.userApiUrl = `${environment.apiUrl}/user`;
  }

  private setAuthToken(authToken: string) {
    localStorage.setItem('authToken', authToken);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private removeAuthToken() {
    localStorage.removeItem('authToken');
  }

  signIn(email: string, password: string): Observable<unknown> {
    const signInParams = { email, password };
    return this.http
      .post<signInResponse>(`${this.userApiUrl}/signin`, signInParams)
      .pipe(
        tap(({ token }) => {
          this.setAuthToken(token);
        }),
        switchMap(() => this.getCurrentUser())
      );
  }

  logout() {
    this.removeAuthToken();
    this.currentUser = null;
  }

  isLoggedIn() {
    return !!this.getAuthToken();
  }

  getCurrentUser(): Observable<User> {
    if (this.currentUser) {
      return of(this.currentUser);
    }

    return this.http.get<User>(`${this.userApiUrl}/me`).pipe(
      tap((user: User) => {
        this.currentUser = user;
        return this.currentUser;
      })
    );
  }
}
