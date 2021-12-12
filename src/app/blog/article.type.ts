import { User, UserId } from './user';

export interface ArticleFormData {
  title: string;
  description: string;
  text: string;
}

export interface Article extends ArticleFormData {
  id?: string;
  author: User;
  createdAt: Date;
  likedBy: UserId[];
};
