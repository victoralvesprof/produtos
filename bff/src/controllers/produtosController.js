import api from "../config/local.js";

class ProdutoController {

  static listarProdutos = async (req, res) => {
    try {
      const response = await api.get("/produtos");
      res.send(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  static listarProdutoPorId = async (req, res) => {
    try {
      const response = await api.get(`/produtos/${req.params.id}`);
      res.send(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  static cadastrarProduto = async (req, res) => {
    try {
      const response = await api.post("/produtos", req.body);
      res.send(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  static atualizarProduto = async (req, res) => {
    try {
      const response = await api.put(`/produtos/${req.params.id}`, req.body);
      res.send(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  static excluirProduto = async (req, res) => {
    try {
      const response = await api.delete(`/produtos/${req.params.id}`);
      res.send(response.data);
    } catch (err) {
      console.error(err);
    }
  }
}

export default ProdutoController