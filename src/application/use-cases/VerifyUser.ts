import { IUseCase } from '../../shared/interfaces/IUseCase';
import { verifyToken } from '@opine-official/authentication';

interface IVerifyUserDTO {
  token: string;
}

export class VerifyUser implements IUseCase<IVerifyUserDTO, void> {
  public constructor() {}

  public async execute(input: IVerifyUserDTO): Promise<void | Error> {
    if (!input.token) {
      return new Error('Missing token');
    }

    if (!process.env.JWT_SECRET) {
      return new Error('Missing JWT secret');
    }

    try {
      verifyToken(input.token, process.env.JWT_SECRET);
    } catch {
      return new Error('Invalid token');
    }
  }
}
