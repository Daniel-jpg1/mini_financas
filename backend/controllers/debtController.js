// controllers/debtController.js

const debtService = require('../services/debtService');

module.exports = {
  async create(req, res) {
    try {
      const userId = req.user.id;
      const { title, amount, description } = req.body;

      if (!title) return res.status(400).json({ error: "Título é obrigatório" });
      if (!amount || amount <= 0)
        return res.status(400).json({ error: "Valor inválido" });

      const debt = await debtService.create({
        userId,
        title,
        amount,
        description
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

      const updates = req.body;

      const updated = await debtService.update(id, userId, updates);

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
  }
};
