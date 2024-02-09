import SaveUser from '../../application/use-cases/SaveUser';
import kafka from '../../infrastructure/brokers/kafka/config';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

const consumer = kafka.consumer({ groupId: 'search-consumer-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-register-topic' });
  const userRepository = new UserRepository();
  const saveUser = new SaveUser(userRepository);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        'reached here': true,
        topic,
        partition,
        value: message?.value?.toString(),
      });

      if (!message?.value?.toString()) {
        return;
      }

      const userData = JSON.parse(message?.value?.toString());

      const saveUserResult = await saveUser.execute(userData);

      if (saveUserResult instanceof Error) {
        console.error(saveUserResult);
        return;
      }
    },
  });
};

run().catch(console.error);

export default run;
