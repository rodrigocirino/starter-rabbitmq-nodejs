const router = require("express").Router();
const amqp = require("amqplib");
const config = require("../config/environment");

var channel;
const queue = "fila01";
//exchange types: direct , topic , headers, fanout (dependende de qual escolher ele manda para filas diferentes, fanout manda pra todas, direct para outra fila, header de acordo com o cabecalho, topic por topicos)
const exchange = "exchange01";
const routingkey01 = "routingkey01";
const routingkey02 = "routingkey02";


async function connect() {
  try {
    //connect
    const conn = await amqp.connect(config.rabbitmq.url);

    //channel for each connections
    channel = await conn.createChannel();
    await channel.assertQueue(queue, { durable: true });

    /*
     * Enquanto seu npm run dev estiver rodando
     * o channel.consume vai abrir um canal de comunicacao
     * e vai ficar rodando esperando o producer enviar requisicoes para a fila
     * logo ele vai ficar em loop abaixo eterno (perfect !)
     * a não ser que vc de um close no channel e na connection
     */
    //consumer a msg
    await channel.consume(queue, (message) => {
      let msgJson = JSON.parse(message.content.toString());

      //ack the msg
      for (const key in msgJson) {
        console.log(
          " [%i] Received %s %o",
          key,
          message.fields.routingKey,
          msgJson
        );
        if (msgJson[key].company == "Dollynho") {
          //return is ok leave the msg
          channel.ack(message);
          console.log(" [%i] Dequeuing %s", key, msgJson[key].company);
        }
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
