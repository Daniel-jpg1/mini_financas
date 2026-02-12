const { Account } = require("../models");

module.exports = {
  async create({ userId, name, balance = 0 }) {
    return Account.create({
      user_id: userId,
      name,
      balance
    });
  },

  async getAll(userId) {
    return Account.findAll({
      where: { user_id: userId },
      order: [["id", "ASC"]],
    });
  },

  async update(userId, accountId, updates) {
  const account = await Account.findOne({
    where: { id: accountId, user_id: userId }
  });

  if (!account) throw new Error("Conta não encontrada");

  // Sanitização/validação do name no update
  if ("name" in updates) {
    const cleaned = String(updates.name).trim();

    if (!cleaned) {
      throw new Error("Nome da conta é obrigatório");
    }

    updates.name = cleaned;
  }

  if ("balance" in updates) {
    const n = Number(updates.balance);
    if (Number.isNaN(n)) {
      throw new Error("Saldo deve ser um número válido");
    }
    updates.balance = n;
  }

  await account.update(updates);
  return account;
}
,

  async delete(userId, accountId) {
    const account = await Account.findOne({
      where: { id: accountId, user_id: userId }
    });

    if (!account) throw new Error("Conta não encontrada");

    await account.destroy();
    return { message: "Conta removida com sucesso" };
  }
};
