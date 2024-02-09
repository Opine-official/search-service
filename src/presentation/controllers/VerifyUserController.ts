import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { VerifyUser } from '../../application/use-cases/VerifyUser';

export class VerifyUserController implements IController {
  public constructor(private readonly _useCase: VerifyUser) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const token = req.cookies['token'];
    const result = await this._useCase.execute({
      token,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send('Token verified');
  }
}
