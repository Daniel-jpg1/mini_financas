const installmentService = require("./installmentService");

const { number } = require("joi");
const { Debt, Installment } = require("../models");

module.exports = {
  async create({
    userId,
    accountId,
    title,
    total_amount,
    number_installments,
    due_date,
    description,
    status,
  }) {
    if (!title) throw new Error("Título da dívida é obrigatório");
    if (!accountId) throw new Error("Conta é obrigatória");
    if (!total_amount) throw new Error("Valor da dívida é obrigatório");
    if (!number_installments)
      throw new Error("Número de parcelas é obrigatório");
    if (!due_date) throw new Error("Data de vencimento é obrigatória");

    const amountNumber = Number(total_amount);
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      throw new Error("Valor inválido");
    }

    const numberInstallments = Number(number_installments);
    if (!Number.isFinite(numberInstallments) || numberInstallments <= 0) {
      throw new Error("Valor inválido");
    }

    const debt = await Debt.create({
      user_id: userId,
      account_id: accountId,
      title,
      total_amount: amountNumber,
      number_installments,
      due_date,
      description,
      status: status || "Pagar",
    });

    const installmentAmount = amountNumber / numberInstallments;

    const baseDate = new Date(due_date);

    for (let i = 1; i <= numberInstallments; i++) {
      const installmentDate = new Date(baseDate);
      installmentDate.setMonth(baseDate.getMonth() + (i - 1));

      await installmentService.create({
        userId,
        debt_id: debt.id,
        account_id: accountId,
        amount: installmentAmount,
        due_date: installmentDate,
        installment_number: i,
      });
    }
    return debt;
  },

  async getAll(userId) {
    return Debt.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
    });
  },

  async getById(id, userId) {
    const debt = await Debt.findOne({
      where: { id, user_id: userId },
    });

    if (!debt) throw new Error("Dívida não encontrada");

    return debt;
  },

  async update(id, userId, updates) {
    const debt = await this.getById(id, userId);

    const allowed = [
      "title",
      "total_amount",
      "number_installments",
      "description",
      "status",
      "number_installments",
      "transaction_date",
    ];

    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([k]) => allowed.includes(k)),
    );

    if (cleanUpdates.total_amount !== undefined) {
      const amountNumber = Number(cleanUpdates.total_amount);
      if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
        throw new Error("Valor inválido");
      }
      cleanUpdates.total_amount = amountNumber;
    }

    await debt.update(cleanUpdates);
    return debt;
  },

  async remove(id, userId) {
    const debt = await this.getById(id, userId);

    const hasInstallments = await Installment.findOne({
      where: { debt_id: id },
    });

    await debt.destroy();
    return true;
  },
};
