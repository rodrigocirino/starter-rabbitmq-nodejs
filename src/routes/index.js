const router = require("express").Router();

//hello
const helloRoute = require("./hello");
router.use("/hello", helloRoute);

//producer
const producerRoute = require("./producer");
router.use("/producer", producerRoute);

//consumer
const consumerRoute = require("./consumer");
router.use("/consumer", consumerRoute);

//exchange
const exchangeRoute = require("./exchange");
router.use("/exchange", exchangeRoute);

//bind
const bindRoute = require("./bind");
router.use("/bind", bindRoute);

module.exports = router;
