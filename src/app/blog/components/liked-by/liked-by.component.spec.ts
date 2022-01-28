import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { User } from '../../../auth';
import { LikedByComponent } from './liked-by.component';

describe('LikedByComponent', () => {
  let fixture: ComponentFixture<LikedByComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikedByComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(LikedByComponent);
  });

  it('should contain right counter in div element', () => {
    const users: User[] = [
      {
        id: '61f129a9fc13ae3725000006',
        firstName: 'Farlee',
        lastName: 'Genicke',
        email: 'fgenicke0@mysql.com',
      },
      {
        id: '61f129a9fc13ae3725000007',
        firstName: 'Silvie',
        lastName: 'Yantsev',
        email: 'syantsev1@naver.com',
      },
    ];
    fixture.componentInstance.likedBy = users;
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.counter').textContent
    ).toContain('2');
  });
});
