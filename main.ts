import { FindByTag } from './src/application/use-cases/FindByTag';
import { SearchPosts } from './src/application/use-cases/SearchPosts';
import { VerifyUser } from './src/application/use-cases/VerifyUser';
import { DatabaseConnection } from './src/infrastructure/database/Connection';
import { PostRepository } from './src/infrastructure/repositories/PostRepository';
import { Server } from './src/infrastructure/Server';
import run from './src/presentation/consumers/SearchConsumer';
import { FindByTagController } from './src/presentation/controllers/FindByTagController';
import { SearchPostsController } from './src/presentation/controllers/SearchPostsController';
import { VerifyUserController } from './src/presentation/controllers/VerifyUserController';

export async function main(): Promise<void> {
  await DatabaseConnection.connect();

  const postRepo = new PostRepository();

  const verifyUser = new VerifyUser();
  const searchPosts = new SearchPosts(postRepo);
  const findByTag = new FindByTag(postRepo);

  const verifyUserController = new VerifyUserController(verifyUser);
  const searchPostsController = new SearchPostsController(searchPosts);
  const findByTagController = new FindByTagController(findByTag);

  run();

  await Server.run(6000, {
    verifyUserController,
    searchPostsController,
    findByTagController,
  });
}

main();
