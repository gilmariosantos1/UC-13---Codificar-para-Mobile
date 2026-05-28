//importanto a classe produto para usar aqui
import { Produto } from "../models/Produto";

//criando a classe de serviço para manipular os produtos
export class ProdutoService {
   private chave = "produtos";

   //salvar lista de produtos
    salva(produtos: Produto[]){
        localStorage.setItem(this.chave, JSON.stringify(produtos));
    }

    //obter lista de produtos
    listar(): Produto[]{
        const dados = localStorage.getItem(this.chave);
        if(!dados) return [];
        return JSON.parse(dados);
    }
    //adicionar um produto
    adicionar(produto: Produto){
        const lista = this.listar();
        lista.push(produto);
        this.salva(lista);
    }

    //remover um produto
    remover(index: number){
        const lista = this.listar();
        lista.splice(index, 1);
        this.salva(lista);
    }
}    