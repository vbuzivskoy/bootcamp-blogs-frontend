import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User, UserId, UserParams } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiUrl: string;

  constructor(private http: HttpClient) {
    this.userApiUrl = `${environment.apiUrl}/user`;
  }

  getUserById(userId: UserId) {
    return this.http.get<User>(`${this.userApiUrl}/${userId}`);
  }

  createUser(userParams: UserParams): Observable<User> {
    const httpRequestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<User>(
      `${this.userApiUrl}`,
      userParams,
      httpRequestOptions
    );
  }
}
