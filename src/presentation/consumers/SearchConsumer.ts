import { SavePost } from '../../application/use-cases/SavePost';
import SaveUser from '../../application/use-cases/SaveUser';
import kafka from '../../infrastructure/brokers/kafka/config';
import { PostRepository } from '../../infrastructure/repositories/PostRepository';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

const consumer = kafka.consumer({ groupId: 'search-consumer-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-register-topic' });
  const userRepository = new UserRepository();
  const saveUser = new SaveUser(userRepository);
  const postRepository = new PostRepository();

  const savePost = new SavePost(postRepository, userRepository);

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

      if (topic === 'user-register-topic') {
        const userData = JSON.parse(message?.value?.toString());

        const saveUserResult = await saveUser.execute(userData);

        if (saveUserResult instanceof Error) {
          console.error(saveUserResult);
          return;
        }
      } else if (topic === 'post-create-topic') {
        const postData = JSON.parse(message?.value?.toString());

        const savePostResult = await savePost.execute(postData);

        if (savePostResult instanceof Error) {
          console.error(savePostResult);
          return;
        }
      }
    },
  });
};

run().catch(console.error);

export default run;
