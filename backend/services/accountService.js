const { Account } = require('../models');

module.exports = {

  async createOrGet(userId) {
    let account = await Account.findOne({ where: { user_id: userId } });

    if (!account) {
      account = await Account.create({
        user_id: userId,
        name: "Conta Principal",
        balance: 0
      });
    }

    return account;
  },

  async getByUser(userId) {
    const account = await Account.findOne({ where: { user_id: userId } });
    if (!account) {
      throw new Error("Conta não encontrada");
    }
    return account;
  },

  async update(userId, updates) {
    const account = await Account.findOne({ where: { user_id: userId } });

    if (!account) {
      throw new Error("Conta não encontrada");
    }

    await account.update(updates);

    return account;
  }
};
