const transactionService = require('../services/transactionService');
const debtService = require('../services/debtService');
const installmentService = require('../services/installmentService');

module.exports = {
  async index(req, res) {
    try {
      const userId = req.user.id;

      const transactions = await transactionService.getAll(userId);
      const debts = await debtService.getAll(userId);
      const installments = await installmentService.getAllByUser(userId);

      const history = [
        ...transactions.map(t => ({ ...t, type: "transaction" })),
        ...debts.map(d => ({ ...d, type: "debt" })),
        ...installments.map(i => ({ ...i, type: "installment" }))
      ];

      history.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      return res.json(history);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
