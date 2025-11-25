const { Transaction, Category, Account } = require('../models');

module.exports = {

  async create({ userId, title, amount, type, category_id, transaction_date, account_id }) {

    if (!title) throw new Error("Título é obrigatório");
    if (!amount || amount <= 0) throw new Error("Valor inválido");
    if (!["income", "expense"].includes(type)) throw new Error("Tipo de transação inválido");

    const category = await Category.findOne({
      where: { id: category_id, user_id: userId }
    });

    if (!category) {
      throw new Error("Categoria não encontrada");
    }

    // Se tiver accounts futuramente:
    if (account_id) {
      const account = await Account.findOne({
        where: { id: account_id, user_id: userId }
      });

      if (!account) {
        throw new Error("Conta bancária não encontrada");
      }
    }

    const transaction = await Transaction.create({
      user_id: userId,
      category_id,
      account_id: account_id || null,
      title,
      amount,
      type,
      transaction_date
    });

    return transaction;
  },

  async getAll(userId) {
    return await Transaction.findAll({
      where: { user_id: userId },
      order: [['transaction_date', 'DESC']]
    });
  },

  async update(id, userId, updates) {

    const transaction = await Transaction.findOne({
      where: { id, user_id: userId }
    });

    if (!transaction) {
      throw new Error("Transação não encontrada");
    }

    // Validações opcionais no update
    if (updates.amount && updates.amount <= 0) {
      throw new Error("Valor inválido");
    }

    if (updates.type && !["income", "expense"].includes(updates.type)) {
      throw new Error("Tipo inválido");
    }

    if (updates.category_id) {
      const category = await Category.findOne({
        where: { id: updates.category_id, user_id: userId }
      });

      if (!category) {
        throw new Error("Categoria inválida");
      }
    }

    if (updates.account_id) {
      const account = await Account.findOne({
        where: { id: updates.account_id, user_id: userId }
      });

      if (!account) {
        throw new Error("Conta bancária inválida");
      }
    }

    await transaction.update(updates);

    return transaction;
  },

  async remove(id, userId) {
    const transaction = await Transaction.findOne({
      where: { id, user_id: userId }
    });

    if (!transaction) {
      throw new Error("Transação não encontrada");
    }

    await transaction.destroy();

    return true;
  }
};
