const transactionService = require('../services/transactionService');

module.exports = {
  async create(req, res) {
    try {
      const userId = req.user.id;
      const { 
        title, 
        amount, 
        type, 
        category_id, 
        account_id,
        transaction_date 
      } = req.body;

      if (!title) 
        return res.status(400).json({ error: "Título é obrigatório" });

      if (!amount || amount <= 0) 
        return res.status(400).json({ error: "Valor inválido" });

      if (!["income", "expense"].includes(type))
        return res.status(400).json({ error: "Tipo inválido (income ou expense)" });

      if (!category_id)
        return res.status(400).json({ error: "Categoria é obrigatória" });

      if (!account_id)
        return res.status(400).json({ error: "Conta (account_id) é obrigatória" });

      const transaction = await transactionService.create({
        userId,
        title,
        amount,
        type,
        category_id,
        account_id,
        transaction_date
      });

      return res.status(201).json(transaction);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async index(req, res) {
    try {
      const userId = req.user.id;

      const transactions = await transactionService.getAll(userId);

      return res.json(transactions);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const updates = req.body;

      const updated = await transactionService.update(id, userId, updates);

      return res.json(updated);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      await transactionService.remove(id, userId);

      return res.json({ message: "Transação deletada com sucesso" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
};
