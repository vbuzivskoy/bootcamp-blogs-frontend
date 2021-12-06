export type UserId = string;

export type User = {
  id: UserId;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
};

export type Article = {
  id?: string;
  author: User;
  title: string;
  description: string;
  text: string;
  createdAt: Date;
  likedBy: UserId[];
  tags: string[];
};

export type ArticleFormData = {
  title: string;
  description: string;
  text: string;
  tags: string;
};
