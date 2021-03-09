module.exports = {
  rabbitmq: {
    url: process.env.RABBITMQ_URL || "amqp://WRONG_URL_TO_CONNECT_RABBITMQ:5672",
    exchange: {
      name: "stock",
      type: "direct",
      routingKeys: {
        increment: "incremented",
        decrement: "decremented",
      },
    },
    connectionName: "stock-producer",
    channelName: "stock-channel",
  },
};
