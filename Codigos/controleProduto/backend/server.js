import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const arquivo = "produtos.json";
const PORT = 3000;

app.get("/produtos", (req, res) => {
    const dados = fs.readFileSync(arquivo, "utf-8");
    const produtos = JSON.parse(dados);
    res.json(produtos);
});

app.post("/produtos", (req, res) => {
    const dados = fs.readFileSync(arquivo, "utf-8");
    const produtos = JSON.parse(dados);
    
    const novoProduto = {
        id: Date.now(),
        ...req.body
    };
    produtos.push(novoProduto);

    fs.writeFileSync(arquivo, JSON.stringify(produtos, null, 2));
    res.status(201).json(novoProduto);
});

app.put("/produtos/:id", (req, res) => {
    const dados = fs.readFileSync(arquivo, "utf-8");
    let produtos = JSON.parse(dados);
    const id = Number(req.params.id);

    produtos = produtos.map(produto =>
        produto.id === id ? { ...produto, ...req.body } : produto
    );

    fs.writeFileSync(arquivo, JSON.stringify(produtos, null, 2));
    res.json({ message: "Produto atualizado" });
});

app.delete("/produtos/:id", (req, res) => {
    const dados = fs.readFileSync(arquivo, "utf-8");
    const id = Number(req.params.id);
    let produtos = JSON.parse(dados);

    produtos = produtos.filter(p => p.id !== id);

    fs.writeFileSync(arquivo, JSON.stringify(produtos, null, 2));
    res.json({ message: "Produto deletado" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});     