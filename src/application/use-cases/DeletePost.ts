import { IPostRepository } from '../../domain/interfaces/IPostRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IDeletePostDTO {
  slug: string;
}

class DeletePost implements IUseCase<IDeletePostDTO, void> {
  constructor(private readonly _postRepo: IPostRepository) {}

  async execute(input: IDeletePostDTO): Promise<void | Error> {
    if (!input.slug) {
      return new Error('Slug param not found');
    }

    const deleteResult = await this._postRepo.delete(input.slug);

    if (deleteResult instanceof Error) {
      return deleteResult;
    }
  }
}

export { DeletePost, IDeletePostDTO };
