import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = new User({
    id: '9c34d115-a13e-43d0-949b-c347a8347fbb',
    firstName: 'Oralle',
    lastName: 'Stanlick',
    avatarUrl:
      'https://robohash.org/doloresinducimus.png?size=50x50&set=set1',
  });
  constructor() { }

  getCurrentUser(): User {
    return this.currentUser;
  }
}
