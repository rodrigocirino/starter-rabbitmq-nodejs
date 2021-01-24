const amqp = require("amqplib");
const config = require("../../config/environment");

const consumerQueue = "test_increment";
const consumerTag = "test_consumer";
let channel;

const connection = async () => {
  try {
    //connect
    const conn = await amqp.connect(config.rabbitmq.url);

    //channel
    channel = await conn.createChannel(config.rabbitmq.channelName);

    await setup(channel);

    return "Ok";
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
    //channel.prefetch(1), //send only one message at time
    channel.consume(consumerQueue, onMessage, {
      //noAck: false, // if true Auto confirm acknowledgment
      consumerTag: consumerTag,
    }),

    //channel.reject(message) or channel.ack(message); //test
    //channel.close();
  ]);
};
// check if increment, decrement or reject the message
const onMessage = (message) => {
  let msgJson = JSON.parse(message.content.toString());

  msgJson.forEach(function (obj) {
    console.log(
      " [=] Received %s %o",
      message.fields.routingKey,
      JSON.stringify(obj)
    );
    if (obj.company == "SBT") {
      //return is ok leave the msg
      channel.ack(message);
      console.log(" [-] Dequeuing %s", obj.company);
    }
  });
};

module.export = connection;
