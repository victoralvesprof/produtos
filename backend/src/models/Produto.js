import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema([
  {
    nome: {type: String, required: true},
    quantidade: {type: Number, required: true},
    validade: {type: Date, required: true},
    preco: {type: Number, required: true},
    imagem: {type: String},
    descricao: {type: String},
    lancamento: {type: Date, required: true},
    compras: {type: [
        {
            nome: {type: String, required: true},
            quantidade: {type: Number, required: true},
            data: {type: Date, required: true},
            valor: {type: Number, required: true}
        }
    ]},
  }]
);

const produtos = mongoose.model('produtos', produtoSchema);

export default produtos;