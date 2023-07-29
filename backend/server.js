import app from './src/app.js';
import amqp from "amqplib";
import produtos from "./src/models/Produto.js";

const port = process.env.PORT || 3001;

// async function consumeMessages() {
//   const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
//   const channel = await connection.createChannel();
//   await channel.assertExchange("logExchange", "direct", {durable: false});
//   const q = await channel.assertQueue("infoQueue");
//   await channel.bindQueue(q.queue, "logExchange", "info");

//   channel.consume(q.queue, (msg) => {
//     const data = JSON.parse(msg.content);
//     console.log("dado: ", data);
//     channel.ack(msg);
//     produtos.findByIdAndUpdate(data.message._id, { $inc: { quantidade: -data.message.quantidade} }, { new: true }).then((documentoAtualizado) => {
//       console.log('Valor subtraído com sucesso!');
//       console.log('Documento atualizado:', documentoAtualizado);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
    
//   });
// }

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
})
// consumeMessages();