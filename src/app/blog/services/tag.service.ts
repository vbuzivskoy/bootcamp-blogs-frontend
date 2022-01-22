import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserService } from '../../auth';
import { Tag } from './tag.interface';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private tagApiUrl: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.tagApiUrl = `${environment.apiUrl}/tag`;
  }

  getPopularTags(limit = 10): Observable<Tag[]> {
    const httpRequestOptions = {
      params: new HttpParams({
        fromObject: { limit },
      }),
    };
    return this.http
      .get<Tag[]>(this.tagApiUrl, httpRequestOptions)
      .pipe(map((tags) => tags.filter((tag) => tag.articles.length !== 0)));
  }

  getTagByName(name: string): Observable<Tag> {
    const httpRequestOptions = {
      params: new HttpParams({
        fromObject: { name },
      }),
    };
    return this.http.get<Tag[]>(this.tagApiUrl, httpRequestOptions).pipe(
      map((tags) => {
        if (tags.length === 0) {
          throw new Error(`Tag with name "${name}" not found`);
        }

        return tags[0];
      })
    );
  }

  getTagById(id: string): Observable<Tag> {
    return this.http.get<Tag>(`${this.tagApiUrl}/${id}`);
  }

  createTag(name: string): Observable<Tag> {
    const httpRequestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<Tag>(this.tagApiUrl, { name }, httpRequestOptions);
  }
}
