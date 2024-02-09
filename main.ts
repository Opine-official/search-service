import { VerifyUser } from './src/application/use-cases/VerifyUser';
import { DatabaseConnection } from './src/infrastructure/database/Connection';
import { Server } from './src/infrastructure/Server';
import run from './src/presentation/consumers/SearchConsumer';
import { VerifyUserController } from './src/presentation/controllers/VerifyUserController';

export async function main(): Promise<void> {
  await DatabaseConnection.connect();

  const verifyUser = new VerifyUser();

  const verifyUserController = new VerifyUserController(verifyUser);

  run();

  await Server.run(4003, { verifyUserController });
}

main();
