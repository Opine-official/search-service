import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IUpdateTokenVersionDTO {
  userId: string;
  tokenVersion: number;
}

interface IUpdateTokenVersionResult {
  userId: string;
}

export class UpdateTokenVersion
  implements IUseCase<IUpdateTokenVersionDTO, IUpdateTokenVersionResult>
{
  constructor(private readonly _userRepo: IUserRepository) {}

  async execute(
    input: IUpdateTokenVersionDTO,
  ): Promise<IUpdateTokenVersionResult | Error> {
    const tokenVersion = await this._userRepo.updateTokenVersion(
      input.userId,
      input.tokenVersion,
    );

    if (tokenVersion instanceof Error) {
      return tokenVersion;
    }

    return {
      userId: input.userId,
    };
  }
}
