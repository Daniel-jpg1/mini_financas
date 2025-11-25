const accountService = require('../services/accountService');

module.exports = {
  async create(req, res) {
    try {
      const userId = req.user.id;
      const { name, balance } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Nome da conta é obrigatório" });
      }

      const account = await accountService.create({
        userId,
        name,
        balance: balance || 0
      });

      return res.status(201).json(account);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async index(req, res) {
    try {
      const userId = req.user.id;
      const accounts = await accountService.getAll(userId);

      return res.json(accounts);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const updates = req.body;

      const updated = await accountService.update(id, userId, updates);

      return res.json(updated);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      await accountService.remove(id, userId);

      return res.json({ message: "Conta deletada com sucesso" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
};
