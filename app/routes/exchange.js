const router = require("express").Router();
const amqp = require("amqplib");
const config = require("../config/environment");

let channel;

/*amqp.connect(rabbSettings = {
  protocol: "amqp",
  hostname: "rabbitmq",
  port: "5672",
  // protocol: 'amqp',
  // hostname: 'localhost',
  // port: 5672,
  // username: 'guest',
  // password: 'guest',
  // locale: 'en_US',
  // frameMax: 0,
  // heartbeat: 0,
  // vhost: '/',
  authMechanism: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
})*/

const connection = async () => {
  try {
    //connect
    const conn = await amqp.connect(config.rabbitmq.url);

    //exchange
    const setup = (channel) => {
      return channel.assertExchange(
        config.rabbitmq.exchange.name,
        config.rabbitmq.exchange.type
      );
    };

    //channel
    channel = await conn.createChannel(config.rabbitmq.channelName, setup);
    console.log("Initializing the rabbitmq instance");
  } catch (err) {
    console.log(`Error -> ${err}`);
  }
};

/*
 *  Esse bind aqui é trabalho do producer e nao do consumer
 * Producer tem que entregar as filas roteadas para o consumer apenas usar.
 */
/* const bindNewQueue = (channel) => {
  //return new Promise(resolve => { });
  return Promise.all([
    //new queue + bind routing key
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
}; */

const publishMessage = (msg, routingkey) => {
  //publish in routingkey
  channel.publish(config.rabbitmq.exchange.name, routingkey, Buffer.from(msg));
  console.log(" [+] Sent %s:'%o'", routingkey, msg);
};

router.route("/").get((req, res) => {
  connection()
    .then((result) => {
      let msg = JSON.stringify([
        { name: "Sundar Pichai", company: "Google" },
        { name: "Mark Zuckerberg", company: "Facebook" },
      ]);
      publishMessage(msg, config.rabbitmq.exchange.routingKeys.increment);
      msg = JSON.stringify([
        { name: "Luciano Hang", company: "Havan" },
        { name: "Silvio Santos", company: "SBT" },
      ]);
      publishMessage(msg, config.rabbitmq.exchange.routingKeys.decrement);
      console.log("\n");
    })
    .catch((err) => {
      console.log(`Error -> ${err}`);
    });
  msg = `Running ${__dirname}`;
  res.json({ msg });
});

module.exports = router;
