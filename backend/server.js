import app from './src/app.js';
import amqp from "amqplib";

const port = process.env.PORT || 3001;

async function consumeMessages() {
  console.log("1");
  const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
  console.log("2");
  const channel = await connection.createChannel();
  console.log("3");
  await channel.assertExchange("logExchange", "direct", {durable: false});
  console.log("4");
  const q = await channel.assertQueue("infoQueue");
  console.log("5");
  await channel.bindQueue(q.queue, "logExchange", "info");

  channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content);
    console.log("dado: ", data);
    channel.ack(msg);
  });
}

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
})
consumeMessages();