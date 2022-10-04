import produtos from "../models/Produto.js";
import ProdutoDao from "../dao/produtoDao.js";

class ProdutoController {

  static listarProdutos = (req, res) => {
    ProdutoDao.listarTodosProdutos(req, res);
  }

  static listarProdutoPorId = (req, res) => {
    ProdutoDao.listarUnicoProduto(req, res);
  }

  static cadastrarProduto = (req, res) => {
    ProdutoDao.addProduto(req, res);
  }

  static atualizarProduto = (req, res) => {
    ProdutoDao.atualizarProduto(req, res);
  }

  static excluirProduto = (req, res) => {
    ProdutoDao.deletarProduto(req, res);
  }
}

export default ProdutoController