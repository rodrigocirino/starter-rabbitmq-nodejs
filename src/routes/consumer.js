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
    await channel.assertQueue(queue, { durable: true });

    //consumer a msg
    await channel.consume(queue, (message) => {
      let msgJson = JSON.parse(message.content.toString());

      console.log(" [x] Received %o", msgJson);

      //ack the msg
      if (msgJson.company == "Dollynho") {
        //return is ok leave the msg
        channel.ack(message);
        console.log(" [x] Dequeuing %s", msgJson.company);
      }
    });
  } catch (err) {
    console.log(`Error -> ${err}`);
  }
}

router.route("/").get((req, res) => {
  var msg = connect();

  res.end();
});

module.exports = router;
