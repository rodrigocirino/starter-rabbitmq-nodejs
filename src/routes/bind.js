const router = require("express").Router();
const consumer = require("../amqp/consumer");

const consumerQueue = "test_increment";
// const consumerTag = "test_consumer";
// var channel;

const bindMessage = (channel, message) => {
  let obj = message.content.toString();
  console.log(
    " [=] Received %s %o",
    message.fields.routingKey,
    JSON.stringify(obj)
  );
};

const bindConsumer = () => {
  consumer
    .startup()
    .then((channel) => {
      console.log("Running consumer");

      channel.consume(consumerQueue, (message) => {
        bindMessage(channel, message);

        /*let msgJson = JSON.parse(message.content.toString());

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
        });*/
      });
    })
    .catch((err) => {
      console.log(`Error -> ${err}`);
    });
};

router.route("/").get((req, res) => {
  bindConsumer();

  console.log("\n");
  res.json();
});

module.exports = router;
