import { User, UserId } from '../../auth';
import { Tag } from './tag.interface';

export interface ArticleFormData {
  title: string;
  description: string;
  text: string;
}

export interface Article extends ArticleFormData {
  id?: string;
  author: User;
  createdAt: Date;
  likedBy: User[];
  tags: Tag[] | string[];
}

export interface ArticleSearchParams {
  author?: UserId;
  tag?: string;
}
