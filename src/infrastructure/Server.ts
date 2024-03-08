import express from 'express';
import cors from 'cors';
import { VerifyUserController } from '../presentation/controllers/VerifyUserController';
import cookieParser from 'cookie-parser';
import { SearchPostsController } from '../presentation/controllers/SearchPostsController';
import { FindByTagController } from '../presentation/controllers/FindByTagController';

interface ServerControllers {
  verifyUserController: VerifyUserController;
  searchPostsController: SearchPostsController;
  findByTagController: FindByTagController;
}

const allowedOrigins = [
  'https://localhost:3000',
  'https://www.opine.ink',
  'https://opine.ink',
];

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credentials: true,
};

export class Server {
  public static async run(
    port: number,
    controllers: ServerControllers,
  ): Promise<void> {
    const app = express();
    app.use(cookieParser());
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/test', (req, res) => res.send('Search service is running'));

    app.get('/', (req, res) => {
      controllers.searchPostsController.handle(req, res);
    });

    app.get('/tag', (req, res) => {
      controllers.findByTagController.handle(req, res);
    });

    app.get('/verifyUser', (req, res) => {
      controllers.verifyUserController.handle(req, res);
    });

    app.listen(port, () => {
      console.log(`Server is running in ${port}`);
    });
  }
}
