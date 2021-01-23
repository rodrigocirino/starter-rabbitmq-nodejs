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

module.exports = router;
