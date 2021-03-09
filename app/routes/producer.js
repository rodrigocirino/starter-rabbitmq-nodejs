const router = require("express").Router();
const amqp = require("amqplib");
const config = require("../config/environment");

var channel;
const queue = "fila01";
const exchange = "exchange01";

async function connect() {
  try {
    //connect
    const conn = await amqp.connect(config.rabbitmq.url);

    //channel and queue
    channel = await conn.createChannel();
    channel.assertExchange(exchange, "direct", { durable: true });
    await channel.assertQueue(queue, { durable: true });

    //producer a msg
    const msg01 = [
      { name: "Sundar Pichai", company: "Google" },
      { name: "Mark Zuckerberg", company: "Facebook" },
    ];
    const msg02 = [
      { name: "Ellon Musk", company: "Tesla" },
      { name: "Zezinho", company: "Dollynho" },
    ];
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg01)));
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg02)));
  } catch (err) {
    console.log(`Error -> ${err}`);
  }
}

router.route("/").get((req, res) => {
  connect();

  msg = `Running ${__dirname}`;
  res.json({ msg });
});

module.exports = router;
