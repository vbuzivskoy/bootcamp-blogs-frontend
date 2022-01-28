export type UserId = string;

export interface UserParams {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatarUrl?: string;
}

export interface User extends UserParams {
  id: UserId;
}
