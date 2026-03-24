const debtService = require("../services/debtService");

module.exports = {
  async create(req, res) {
    try {
      const userId = req.user.id;
      const {
        title,
        total_amount,
        number_installments,
        description,
        accountId,
        status,
      } = req.body;

      if (!title)
        return res.status(400).json({ error: "Título é obrigatório" });
      if (!accountId)
        return res.status(400).json({ error: "Conta é obrigatória" });

      const amountNumber = Number(total_amount);
      if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
        return res.status(400).json({ error: "Valor inválido" });
      }

      const debt = await debtService.create({
        userId,
        accountId,
        title,
        total_amount: amountNumber,
        number_installments,
        description,
        status: status || "Pagar",
      });

      return res.status(201).json(debt);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async index(req, res) {
    try {
      const userId = req.user.id;
      const debts = await debtService.getAll(userId);
      return res.json(debts);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const updated = await debtService.update(id, userId, req.body);

      return res.json(updated);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      await debtService.remove(id, userId);

      return res.json({ message: "Dívida deletada com sucesso" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
};
