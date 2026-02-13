const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./database/connection");

// Carrega variáveis de ambiente
dotenv.config();

require("./models/index");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Servidor está funcionando! 🚀");
});

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log("Conexão com o MySQL estabelecida com sucesso!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Erro ao iniciar servidor/MySQL:", err);
  });
