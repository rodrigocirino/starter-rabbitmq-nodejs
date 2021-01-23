const router = require("express").Router();
const amqp = require("amqplib");

var channel;
const queue = "fila01";
const exchange = "exchange01";
const routingkey01 = "routingkey01";
const routingkey02 = "routingkey02";

const rabbSettings = {
  protocol: process.env.AMQP_PROTOCOL,
  hostname: process.env.AMQP_HOSTNAME,
  port: process.env.AMQP_PORT,
  //below is default and not necessary
  //username: "guest",
  //password: "guest",
  //vhost: "/",
  //authMechanism: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
};

async function connect() {
  try {
    //connect
    const conn = await amqp.connect(rabbSettings);

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
  res.json({ msg, rabbSettings });
});

module.exports = router;
