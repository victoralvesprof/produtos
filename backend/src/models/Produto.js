import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema([
  {
    nome: {type: String, required: true},
    quantidade: {type: Number, required: true},
    validade: {type: Date, required: true},
    preco: {type: Number, required: true},
    imagem: {type: String, required: false},
    descricao: {type: String, required: false},
    lancamento: {type: Date, required: false},
    compras: {type: [
        {
            nome: {type: String, required: true},
            quantidade: {type: Number, required: true},
            data: {type: Date, required: true},
            valor: {type: Number, required: true}
        }
    ], required: false},
  }]
);

const produtos = mongoose.model('produtos', produtoSchema);

export default produtos;