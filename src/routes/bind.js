const router = require("express").Router();
const consumer = require("../amqp/consumer");

router.route("/").get((req, res) => {
  consumer
    .connection()
    .then((result) => {
      console.log(`Log -> ${result}`);
    })
    .catch((err) => {
      console.log(`Error -> ${err}`);
    });
  console.log("\n");
  msg = `Running ${__dirname}`;
  res.json({ msg });
});

module.exports = router;
