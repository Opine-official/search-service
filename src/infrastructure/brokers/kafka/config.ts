import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'search-service',
  brokers: ['kafka:9092'],
});

export default kafka;
