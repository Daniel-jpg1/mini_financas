const { UniqueConstraintError, ValidationError } = require("sequelize");
const accountService = require("../services/accountService");

module.exports = {

  async create(req, res) {
    try {
      // Verifica autenticação
      if (!req.user?.id) {
        return res.status(401).json({ error: "Não autenticado" });
      }

      const userId = req.user.id;
      const { name, balance } = req.body;

      // Validação básica
      if (!name || !name.trim()) {
        return res.status(400).json({ error: "Nome da conta é obrigatório" });
      }

      // Converte balance corretamente
      let parsedBalance = balance ?? 0;

      if (typeof parsedBalance === "string") {
        parsedBalance = Number(parsedBalance);
      }

      if (Number.isNaN(parsedBalance)) {
        return res.status(400).json({ error: "Saldo deve ser um número válido" });
      }

      const account = await accountService.create({
        userId,
        name: name.trim(),
        balance: parsedBalance
      });

      return res.status(201).json(account);

    } catch (err) {

      console.error("ACCOUNT CREATE ERROR:", err);

      // Conta duplicada 
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({
          error: "Você já tem uma conta com esse nome."
        });
      }

      // Erro de validação do Sequelize
      if (err instanceof ValidationError) {
        return res.status(400).json({
          error: err.errors?.[0]?.message || "Dados inválidos."
        });
      }

      // Erro inesperado
      return res.status(500).json({
        error: "Erro interno ao criar conta."
      });
    }
  },

  async index(req, res) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Não autenticado" });
      }

      const userId = req.user.id;
      const accounts = await accountService.getAll(userId);

      return res.json(accounts);

    } catch (err) {
      console.error("ACCOUNT INDEX ERROR:", err);
      return res.status(500).json({ error: "Erro interno ao listar contas." });
    }
  },

  async update(req, res) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Não autenticado" });
      }

      const userId = req.user.id;
      const { id } = req.params;
      const updates = req.body;

      const updated = await accountService.update(userId, id, updates);

      return res.json(updated);

    } catch (err) {

      console.error("ACCOUNT UPDATE ERROR:", err);

      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({
          error: "Você já tem uma conta com esse nome."
        });
      }

      if (err instanceof ValidationError) {
        return res.status(400).json({
          error: err.errors?.[0]?.message || "Dados inválidos."
        });
      }

      return res.status(500).json({ error: "Erro interno ao atualizar conta." });
    }
  },

  async delete(req, res) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Não autenticado" });
      }

      const userId = req.user.id;
      const { id } = req.params;

      await accountService.delete(userId, id);

      return res.json({ message: "Conta deletada com sucesso" });

    } catch (err) {
      console.error("ACCOUNT DELETE ERROR:", err);
      return res.status(500).json({ error: "Erro interno ao deletar conta." });
    }
  }
};
