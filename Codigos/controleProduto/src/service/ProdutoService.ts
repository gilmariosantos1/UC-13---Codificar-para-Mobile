//importanto a classe produto para usar aqui
import { Produto } from "../models/Produto";

//criando a classe de serviço para manipular os produtos
export class ProdutoService {
   private chave = "produtos";

   baseUrl = "http://localhost:3000";
  
    //obter lista de produtos
    async listar(){
        try {
            const res = await fetch(`${this.baseUrl}/produtos`);
            if (!res.ok) {
                throw new Error(`Erro na requisição: ${res.status}`);
            }
            return await res.json();
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            return [];
        }
    }
    //adicionar um produto
    async adicionar(produto: any){
        try {
            const res = await fetch(`${this.baseUrl}/produtos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produto)
            });
            if (!res.ok) {
                throw new Error(`Falha ao adicionar produto: ${res.status}`);
            }
            return await res.json();
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            return null;
        }
    }

    //atualizar um produto
    async atualizar(id: number, produto: any){
        try {
            const res = await fetch(`${this.baseUrl}/produtos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produto)
            });
            if (!res.ok) {
                throw new Error(`Falha ao atualizar produto: ${res.status}`);
            }
            return await res.json();
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            return null;
        }
    }
    //remover um produto
    async remover(id: number){
        try {
            await fetch(`${this.baseUrl}/produtos/${id}`, {
                method: "DELETE"
            });
        } catch (error) {
            console.error("Erro ao remover produto:", error);
        }
    }
}    