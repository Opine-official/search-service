import { Request, Response, NextFunction } from 'express';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';

const userRepo: IUserRepository = new UserRepository();

export async function checkUserTokenVersion(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tokenVersion = req.user.version;

    if (!tokenVersion) {
      return res.status(401).json({ error: 'Invalid token version' });
    }

    const compareTokenVersion = await userRepo.compareTokenVersion(
      req.user.userId,
      tokenVersion,
    );

    if (!compareTokenVersion) {
      return res
        .status(401)
        .json({ error: 'Invalid token, comparison failed' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token, comparison error' });
  }
}
