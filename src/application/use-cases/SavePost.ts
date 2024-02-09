import { Post } from '../../domain/entities/Post';
import { IPostRepository } from '../../domain/interfaces/IPostRepository';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface ISavePostDTO {
  postId: string;
  title: string;
  description: string;
  user: string;
  tags: string[];
  slug: string;
  isDraft: boolean;
  isThreadsEnabled: boolean;
  createdAt: Date;
}

interface ISavePostResult {
  postId: string;
}

export class SavePost implements IUseCase<ISavePostDTO, ISavePostResult> {
  constructor(
    private readonly _postRepo: IPostRepository,
    private readonly _userRepo: IUserRepository,
  ) {}

  async execute(input: ISavePostDTO): Promise<ISavePostResult | Error> {
    const mongoId = await this._userRepo.findMongoIdByUserId(input.user);

    if (!mongoId) {
      return new Error('User not found');
    }

    const postData = {
      postId: input.postId,
      title: input.title,
      description: input.description,
      user: mongoId,
      tags: input.tags,
      slug: input.slug,
      isDraft: input.isDraft,
      isThreadsEnabled: input.isThreadsEnabled,
      postedOn: input.createdAt,
    };

    const post = new Post(postData);
    const savePostResult = await this._postRepo.save(post);

    if (savePostResult instanceof Error) {
      return savePostResult;
    }

    return {
      postId: post.postId,
    };
  }
}
