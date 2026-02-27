const { Debt, Installment } = require("../models");

module.exports = {
  async create({ userId, accountId, title, total_amount, description, status }) {
    if (!title) throw new Error("Título da dívida é obrigatório");
    if (!accountId) throw new Error("Conta é obrigatória");

    const amountNumber = Number(total_amount);
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      throw new Error("Valor inválido");
    }

    const debt = await Debt.create({
      user_id: userId,
      account_id: accountId,
      title,
      total_amount: amountNumber,
      description,
      status: status || "Pagar",
    });

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
      "description",
      "status",
      "number_installments",
      "transaction_date",
    ];

    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([k]) => allowed.includes(k))
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

    if (hasInstallments) {
      throw new Error("Não é possível apagar uma dívida que possui parcelas");
    }

    await debt.destroy();
    return true;
  },
};