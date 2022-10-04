import produtos from "../models/Produto.js";

class ProdutoDao {

    static listarTodosProdutos = (req, res) => {
        produtos.find((err, produtos) => {
            res.status(200).json(produtos)
        })
    }

    static listarUnicoProduto = (req, res) => {
        const id = req.params.id;

        produtos.findById(id)
            .exec((err, produtos) => {
                if (err) {
                    res.status(400).send({ message: `${err.message} - ID do produto não localizado.` })
                } else {
                    res.status(200).send(produtos);
                }
            })
    }

    static addProduto = (req, res) => {
        let produto = new produtos(req.body);

        produto.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Falha ao cadastrar produto.` })
            } else {
                res.status(201).send(produto.toJSON())
            }
        })
    }

    static atualizarProduto = (req, res) => {
        const id = req.params.id;

        produtos.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Produto atualizado com sucesso' })
            } else {
                res.status(500).send({ message: err.message })
            }
        })
    }

    static deletarProduto = (req, res) => {
        const id = req.params.id;

        produtos.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Produto removido com sucesso' })
            } else {
                res.status(500).send({ message: err.message })
            }
        })
    }
}

export default ProdutoDao;