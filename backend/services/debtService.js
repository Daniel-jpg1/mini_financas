const { Debt, Installment } = require('../models');

module.exports = {
  
  async create({ userId, title, total_amount, due_date }) {
    if (!title) {
      throw new Error("Título da dívida é obrigatório");
    }

    if (!total_amount || total_amount <= 0) {
      throw new Error("Valor total inválido");
    }

    const debt = await Debt.create({
      user_id: userId,
      title,
      total_amount,
      due_date,
      status: "pending"
    });

    return debt;
  },

  async getAll(userId) {
    const debts = await Debt.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]]
    });

    return debts;
  },

  async getById(id, userId) {
    const debt = await Debt.findOne({
      where: { id, user_id: userId }
    });

    if (!debt) {
      throw new Error("Dívida não encontrada");
    }

    return debt;
  },

  async update(id, userId, updates) {
    const debt = await this.getById(id, userId);

    await debt.update(updates);

    return debt;
  },

  async remove(id, userId) {
    const debt = await this.getById(id, userId);

    const hasInstallments = await Installment.findOne({
      where: { debt_id: id }
    });

    if (hasInstallments) {
      throw new Error("Não é possível apagar uma dívida que possui parcelas");
    }

    await debt.destroy();

    return true;
  }
};
