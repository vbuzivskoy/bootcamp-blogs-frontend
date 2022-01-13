import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogTitleService {
  private titleSubject = new Subject<string>();

  getTitle(): Observable<string> {
    return this.titleSubject;
  }

  setTitle(value: string) {
    this.titleSubject.next(value);
  }
}
