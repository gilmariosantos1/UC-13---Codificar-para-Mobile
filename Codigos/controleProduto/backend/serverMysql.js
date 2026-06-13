const db = require('mysql2/promise');

const express = require("express");
const app = express();
app.use(express.json());

const connection = db.createConnection({
    host: 'localhost',
    user:'sabor_senac',
    password: 'Qwe@2203',
    database: 'produtos'
});
PORT = 3000;

console.log("Conectando ao banco de dados...", connection.user);        
    
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});