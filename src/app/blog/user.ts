import { v4 as uuidv4 } from 'uuid';

export type UserId = string;

export interface UserParams {
  id?: UserId;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
};

export class User {
  id: UserId;
  firstName: string;
  lastName: string;
  avatarUrl?: string;

  constructor(userParams: UserParams) {
    this.id = userParams.id || uuidv4();
    this.firstName = userParams.firstName;
    this.lastName = userParams.lastName;
    this.avatarUrl = userParams.avatarUrl;
  }
}
