const installmentService = require('../services/installmentService');

module.exports = {

  async create(req, res) {
    try {
      const userId = req.user.id;
      const { debt_id, amount, due_date, installment_number } = req.body;

      if (!debt_id) {
        return res.status(400).json({ error: "debt_id is required" });
      }

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "amount must be greater than zero" });
      }

      if (!installment_number) {
        return res.status(400).json({ error: "installment_number is required" });
      }

      const installment = await installmentService.create({
        userId,
        debt_id,
        amount,
        due_date,
        installment_number
      });

      return res.status(201).json(installment);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async index(req, res) {
    try {
      const userId = req.user.id;
      const { debt_id } = req.params;

      const installments = await installmentService.getByDebt(debt_id, userId);

      return res.json(installments);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async show(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const installment = await installmentService.findById({ id, userId });

      return res.json(installment);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { amount, due_date, status } = req.body;

      const updated = await installmentService.update({
        id,
        userId,
        amount,
        due_date,
        status
      });

      return res.json(updated);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      await installmentService.delete({ id, userId });

      return res.status(204).send();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
};
