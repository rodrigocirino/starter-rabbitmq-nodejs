const router = require("express").Router();

//hello
const helloRoute = require("./hello");
router.use("/hello", helloRoute);

//amqp
const amqpRoute = require("./amqp");
router.use("/amqp", amqpRoute);

module.exports = router;
