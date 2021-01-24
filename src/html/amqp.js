const router = require("express").Router();
const amqp = require("amqplib");

var channel;
const queue = "rabbit";

async function connect() {
  try {
    const conn = await amqp.connect(
      process.env.AMQP_HOST || "amqp://localhost:5672/"
    );
    channel = await conn.createChannel();
    await channel.assertQueue(queue, { durable: true });

    const fakeData = {
      name: "Sundar Pichai",
      company: "Google",
    };
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(fakeData)), {
      persistent: true,
    });

    channel.consume(
      queue,
      function (msg) {
        var secs = msg.content.toString().split(".").length - 1;

        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function () {
          console.log(" [x] Done");
        }, secs * 1000);
      },
      {
        // automatic acknowledgment mode,
        // see https://www.rabbitmq.com/confirms.html for details
        noAck: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

router.route("/").get((req, res) => {
  connect();

  msg = `Hello ${req.query.name || "World"} from GET request!`;
  res.json({ msg });
  console.log(msg);
});

module.exports = router;
