import { Post } from '../entities/Post';

export interface User {
  name: string;
  username: string;
  profile: string;
  userId: string;
}

export interface PostSearch {
  postId: string;
  title: string;
  description: string;
  user: User;
  tags: string[];
  slug: string;
  postedOn: Date;
}

export interface IPostRepository {
  save(post: Post): Promise<void | Error>;
  delete(slug: string): Promise<void | Error>;
  search(query: string): Promise<PostSearch[] | Error>;
  findByTag(tag: string): Promise<PostSearch[] | Error>;
}
