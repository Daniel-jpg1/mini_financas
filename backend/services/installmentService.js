const { Installment, Debt } = require('../models');

module.exports = {

  async create({ userId, debt_id, amount, due_date, installment_number }) {

    if (!debt_id) throw new Error("ID da dívida é obrigatório");
    if (!amount || amount <= 0) throw new Error("Valor da parcela inválido");
    if (!installment_number) throw new Error("Número da parcela é obrigatório");

    const debt = await Debt.findOne({
      where: { id: debt_id, user_id: userId }
    });

    if (!debt) {
      throw new Error("Dívida não encontrada ou não pertence ao usuário");
    }

    const installment = await Installment.create({
      debt_id,
      amount,
      due_date,
      installment_number,
      status: "pending"
    });

    return installment;
  },

  async getByDebt(debt_id, userId) {

    const debt = await Debt.findOne({
      where: { id: debt_id, user_id: userId }
    });

    if (!debt) {
      throw new Error("Dívida não encontrada");
    }

    const installments = await Installment.findAll({
      where: { debt_id },
      order: [["installment_number", "ASC"]]
    });

    return installments;
  },

  async update(id, userId, updates) {
    const installment = await Installment.findOne({ where: { id } });

    if (!installment) {
      throw new Error("Parcela não encontrada");
    }

    const debt = await Debt.findOne({
      where: { id: installment.debt_id, user_id: userId }
    });

    if (!debt) {
      throw new Error("Você não tem permissão para alterar esta parcela");
    }

    if (updates.amount && updates.amount <= 0) {
      throw new Error("Valor inválido");
    }

    await installment.update(updates);

    return installment;
  },

  async remove(id, userId) {
    const installment = await Installment.findOne({ where: { id } });

    if (!installment) {
      throw new Error("Parcela não encontrada");
    }

    const debt = await Debt.findOne({
      where: { id: installment.debt_id, user_id: userId }
    });

    if (!debt) {
      throw new Error("Você não tem permissão para excluir esta parcela");
    }

    await installment.destroy();

    return true;
  }
};
