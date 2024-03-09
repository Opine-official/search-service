import { UserModel } from '../models/UserModel';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';

export class UserRepository implements IUserRepository {
  public async save(user: User): Promise<Error | void> {
    try {
      const userDocument = new UserModel({
        userId: user.userId,
        name: user.name,
        email: user.email,
        username: user.username,
        profile: user.profile,
      });

      await userDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async findMongoIdByUserId(userId: string): Promise<string | null> {
    const userDocument = await UserModel.findOne({ userId });
    return userDocument ? userDocument._id.toString() : null;
  }

  public async updateTokenVersion(
    userId: string,
    tokenVersion: number,
  ): Promise<number | Error> {
    try {
      const userDocument = await UserModel.findOne({ userId });
      if (!userDocument) {
        throw new Error('User not found');
      }
      userDocument.tokenVersion = tokenVersion;

      await userDocument.save();

      return userDocument.tokenVersion;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async compareTokenVersion(
    userId: string,
    tokenVersion: number,
  ): Promise<boolean> {
    try {
      const userDocument = await UserModel.findOne({
        userId,
        tokenVersion,
      });

      return !!userDocument;
    } catch (error: unknown) {
      return false;
    }
  }
}
