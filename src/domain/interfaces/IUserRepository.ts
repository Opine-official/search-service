import { User } from '../../domain/entities/User';

export interface IUserRepository {
  save(user: User): Promise<void | Error>;
  findMongoIdByUserId(userId: string): Promise<string | null>;
}
