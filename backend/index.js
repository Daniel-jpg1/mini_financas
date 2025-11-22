// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./database/connection");

// Carrega variáveis de ambiente
dotenv.config();

// Carrega todas as models e associações
require("./models/index");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota simples só para teste
app.get("/", (req, res) => {
  res.send("Servidor está funcionando! 🚀");
});

// Porta
const PORT = process.env.PORT || 3000;

// Testa conexão com MySQL → sincroniza tabelas → inicia o servidor
sequelize.authenticate()
  .then(() => {
    console.log("Conexão com o MySQL estabelecida com sucesso!");

    // 🔥 CRIA/SINCRONIZA AS TABELAS
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Tabelas sincronizadas com sucesso! 🗄️");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Erro ao iniciar servidor/MySQL:", err);
  });
