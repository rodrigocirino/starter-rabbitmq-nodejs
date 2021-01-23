module.exports = {
  rabbitmq: {
    url: process.env.AMQP_URL || "amqp://localhost:5672",
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
