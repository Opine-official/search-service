import {
  IPostRepository,
  PostSearch,
} from '../../domain/interfaces/IPostRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IFindByTagDTO {
  tag: string;
}

interface IFindByTagResult {
  posts: PostSearch[];
}

export class FindByTag implements IUseCase<IFindByTagDTO, IFindByTagResult> {
  constructor(private readonly _postRepo: IPostRepository) {}

  async execute(input: IFindByTagDTO): Promise<IFindByTagResult | Error> {
    const posts = await this._postRepo.findByTag(input.tag);

    if (posts instanceof Error) {
      return posts;
    }

    return {
      posts,
    };
  }
}
