const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // carrega o .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota simples só pra testar
app.get("/", (req, res) => {
  res.send("Servidor está funcionando! 🚀");
});

// Porta
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
