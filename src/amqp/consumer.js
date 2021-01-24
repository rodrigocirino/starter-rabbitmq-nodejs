const amqp = require("amqplib");
const config = require("../../config/environment");

const consumerQueue = "test_increment";

const startup = async () => {
  try {
    //connect
    const conn = await amqp.connect(config.rabbitmq.url);

    //channel
    channel = await conn.createChannel(config.rabbitmq.channelName);

    await setup(channel);

    return channel;
  } catch (err) {
    console.log(`Error -> ${err}`);
    return err;
  }
};

const setup = (channel) => {
  return Promise.all([
    channel.assertExchange(
      config.rabbitmq.exchange.name,
      config.rabbitmq.exchange.type
    ),
    channel.assertQueue(consumerQueue, { durable: true }),
    channel.bindQueue(
      consumerQueue,
      config.rabbitmq.exchange.name,
      config.rabbitmq.exchange.routingKeys.increment
    ),
    channel.bindQueue(
      consumerQueue,
      config.rabbitmq.exchange.name,
      config.rabbitmq.exchange.routingKeys.decrement
    ),
  ]);
};

module.exports = { startup };
