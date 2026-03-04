const { Transaction, Category, Account } = require("../models");

const PAYMENT_TYPES = ["Pix", "Credito", "Dinheiro", "Debito"];
const DIRECTIONS = ["Receber", "Pagar"];

function toNumberOrNaN(value) {
  const n = typeof value === "string" ? Number(value.replace(",", ".")) : Number(value);
  return n;
}

module.exports = {

  async create({
    userId,
    amount,
    type,
    direction,
    category_id,
    account_id,
    description,
    transaction_date,
  }) {
    const parsedAmount = toNumberOrNaN(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      throw new Error("Valor inválido");
    }

    if (!PAYMENT_TYPES.includes(type)) {
      throw new Error("Tipo inválido (Pix, Credito, Dinheiro ou Debito)");
    }

    if (!DIRECTIONS.includes(direction)) {
      throw new Error("Direção inválida (Receber ou Pagar)");
    }

    if (!account_id) {
      throw new Error("Conta (account_id) é obrigatória");
    }

    const account = await Account.findOne({
      where: { id: account_id, user_id: userId },
    });

    if (!account) {
      throw new Error("Conta bancária não encontrada");
    }

    if (category_id) {
      const category = await Category.findOne({
        where: { id: category_id, user_id: userId },
      });

      if (!category) {
        throw new Error("Categoria inválida");
      }
    }

    const transaction = await Transaction.create({
      user_id: userId,
      account_id,
      type,
      direction,
      category_id: category_id || null,
      amount: parsedAmount,
      description: description || null,
      transaction_date: transaction_date || undefined,
    });

    return transaction;
  },

  async getAll(userId) {
    return await Transaction.findAll({
      where: { user_id: userId },
      order: [["transaction_date", "DESC"]],
    });
  },

  async update(id, userId, updates) {
    const transaction = await Transaction.findOne({
      where: { id, user_id: userId },
    });

    if (!transaction) {
      throw new Error("Transação não encontrada");
    }

    if (updates.amount !== undefined) {
      const parsedAmount = toNumberOrNaN(updates.amount);
      if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        throw new Error("Valor inválido");
      }
      updates.amount = parsedAmount;
    }

    if (updates.type !== undefined) {
      if (!PAYMENT_TYPES.includes(updates.type)) {
        throw new Error("Tipo inválido (Pix, Credito, Dinheiro ou Debito)");
      }
    }

    if (updates.direction !== undefined) {
      if (!DIRECTIONS.includes(updates.direction)) {
        throw new Error("Direção inválida (Receber ou Pagar)");
      }
    }

    if (updates.category_id !== undefined) {
      // permitir null pra remover categoria
      if (updates.category_id === null || updates.category_id === "") {
        updates.category_id = null;
      } else {
        const category = await Category.findOne({
          where: { id: updates.category_id, user_id: userId },
        });
        if (!category) throw new Error("Categoria inválida");
      }
    }

    if (updates.account_id !== undefined) {
      if (!updates.account_id) {
        throw new Error("Conta (account_id) é obrigatória");
      }

      const account = await Account.findOne({
        where: { id: updates.account_id, user_id: userId },
      });

      if (!account) throw new Error("Conta bancária inválida");
    }

    await transaction.update(updates);

    return transaction;
  },

  async remove(id, userId) {
    const transaction = await Transaction.findOne({
      where: { id, user_id: userId },
    });

    if (!transaction) {
      throw new Error("Transação não encontrada");
    }

    await transaction.destroy();
    return true;
  },
};