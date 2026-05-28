export class Produto {
    nome: string;
    preco: number;
    estoque: number;

    constructor(nome: string, preco: number){
        this.nome = nome;
        this.preco = preco;
        this.estoque = 0;      
    }
    //método para adicionar estoque
    adicionarEstoque(qtd: number){
        this.estoque += qtd;

    }
}