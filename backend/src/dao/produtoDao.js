import produtos from "../models/Produto.js";

class ProdutoDao {

    static listarTodosProdutos = async (req, res) => {
        try {
            await produtos.find()
            .then((produtosResultado) => res.status(200).json(produtosResultado))
            .catch((err) => res.status(500).json(err))
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static listarUnicoProduto = async (req, res) => {
        const id = req.params.id;

        try {
            await produtos.findById(id)
            .then((produtosResultado) => res.status(200).json(produtosResultado))
            .catch((err) => res.status(500).json(err))
        } catch (err) {
            res.status(500).json(err);
            res.status(400).json(err);
        }
    }

    static addProduto = async (req, res) => {
        try{
            const produto = new produtos(req.body);
    
            await produto.save()
            .then((savedContact) => {
                console.log("retornou salvo: ", savedContact);
                res.status(201).json({ msg: 'Produto atualizado com sucesso' });
            })
            .catch((error) => {
                console.log("erro ao salvar: ", error);
                res.status(500).json({ msg: error.message });
            })
        } catch(error) {
            console.log("erro catch de fora salvar: ", error);
            res.status(500).json({ msg: error.message });
        }
    }

    static atualizarProduto = async (req, res) => {
        try{
            const id = req.params.id;
            const updateProduct = req.body;
    
            await produtos.findOneAndUpdate({_id: id}, { $set: updateProduct }, {new: true})
            .then((updateContact) => {
                console.log("retornou update: ", updateContact);
                res.status(200).json({ msg: 'Produto atualizado com sucesso' });
            })
            .catch((error) => {
                console.log("error update: ", error);
                res.status(500).json({ msg: error.message });
            })
        } catch(error) {
            console.log("error catch de fora update: ", error);
            res.status(500).json({ msg: error.message });
        }
    }

    static deletarProduto = async (req, res) => {
        const id = req.params.id;

        try {
            await produtos.findByIdAndDelete(id)
            .then((deleteProduct) => {
                console.log(deleteProduct);
                res.status(200).json({ msg: 'Produto removido com sucesso' });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: error.message });
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}

export default ProdutoDao;