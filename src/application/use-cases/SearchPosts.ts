import {
  IPostRepository,
  PostSearch,
  User,
} from '../../domain/interfaces/IPostRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface ISearchPostsDTO {
  query: string;
}

type ISearchPostsResult = PostSearch[];

export class SearchPosts
  implements IUseCase<ISearchPostsDTO, ISearchPostsResult>
{
  constructor(private readonly _postRepo: IPostRepository) {}

  async execute(input: ISearchPostsDTO): Promise<ISearchPostsResult | Error> {
    const posts = await this._postRepo.search(input.query);

    if (posts instanceof Error) {
      return posts;
    }

    if (!posts.length) {
      return [];
    }

    const result: ISearchPostsResult = posts.map((post) => ({
      postId: post.postId!,
      title: post.title!,
      description: post.description!,
      user: post.user as unknown as User,
      tags: post.tags!,
      slug: post.slug!,
      postedOn: post.postedOn!,
    }));

    return result;
  }
}
