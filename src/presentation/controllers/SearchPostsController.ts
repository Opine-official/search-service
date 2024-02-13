import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { SearchPosts } from '../../application/use-cases/SearchPosts';

export class SearchPostsController implements IController {
  public constructor(private readonly _useCase: SearchPosts) {}

  public async handle(req: Request, res: Response): Promise<void> {
    if (!req.query.q) {
      res.status(400).json({ error: 'Query is required' });
      return;
    }

    if (typeof req.query.q !== 'string') {
      res.status(400).json({ error: 'Query must be a string' });
      return;
    }

    const result = await this._useCase.execute({
      query: req.query.q,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send(result);
  }
}
