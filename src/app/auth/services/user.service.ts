import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from './user';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiUrl: string;
  private currentUser?: User;

  constructor(private http: HttpClient) {
    this.userApiUrl = `${environment.apiUrl}/user`;
  }

  getCurrentUser(): Observable<User> {
    if (this.currentUser) {
      return of(this.currentUser);
    }

    const httpRequestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getAuthToken()}`,
      }),
    };
    return this.http
      .get<User>(`${this.userApiUrl}/me`, httpRequestOptions)
      .pipe(
        tap((user: User) => {
          this.currentUser = user;
          return this.currentUser;
        })
      );
  }

  getAuthToken(): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWRjMjI2NWQ1NzIyY2FiMWVjYzY5NTgiLCJpYXQiOjE2NDE4OTA3OTF9.T1tVXpgdy8lb7DhwQqmfjvCDhdD5bayFXOljzaN-zUM';
  }

  getUserById(userId: string) {
    return this.http.get<User>(`${this.userApiUrl}/${userId}`);
  }
}
