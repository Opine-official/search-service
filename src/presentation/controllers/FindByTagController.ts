import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { FindByTag } from '../../application/use-cases/FindByTag';

export class FindByTagController implements IController {
  public constructor(private readonly _useCase: FindByTag) {}

  public async handle(req: Request, res: Response): Promise<void> {
    if (!req.query.tag) {
      res.status(400).json({ error: 'Tag is required' });
      return;
    }

    if (typeof req.query.tag !== 'string') {
      res.status(400).json({ error: 'Tag must be a string' });
      return;
    }

    const result = await this._useCase.execute({
      tag: req.query.tag,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send(result);
  }
}
