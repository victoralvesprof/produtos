export interface Produto {
    _id?: string;
    nome: string;
    quantidade: number;
    validade: Date;
    preco: number;
    imagem: string;
    descricao: string;
    lancamento: Date;
    compras: Array<Comprador>
}

export interface Comprador {
    nome: string;
    quantidade: number;
    data: Date;
    valor: number;
}
