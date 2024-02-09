import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface ISaveUserDTO {
  userId: string;
  name: string;
  email: string;
  profile: string | null;
  username: string;
}

interface ISaveUserResult {
  userId: string;
}

class SaveUser implements IUseCase<ISaveUserDTO, ISaveUserResult> {
  constructor(private readonly _userRepo: IUserRepository) {}

  async execute(input: ISaveUserDTO): Promise<ISaveUserResult | Error> {
    const user = new User(
      input.userId,
      input.name,
      input.email,
      input.profile,
      input.username,
    );
    const saveUserResult = await this._userRepo.save(user);

    if (saveUserResult instanceof Error) {
      return saveUserResult;
    }

    return {
      userId: user.userId,
    };
  }
}

export default SaveUser;
