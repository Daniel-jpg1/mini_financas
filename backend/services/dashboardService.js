const { Op } = require("sequelize");
const {
  Installment,
  Debt,
  Transaction,
  Category,
  Account,
} = require("../models");

module.exports = {
  async getSummary(userId) {
    const today = new Date();

    const startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOfTomorrow = new Date(tomorrow);
    startOfTomorrow.setHours(0, 0, 0, 0);

    const endOfTomorrow = new Date(tomorrow);
    endOfTomorrow.setHours(23, 59, 59, 999);

    const [
      accounts,
      transactionsCount,
      categoriesCount,
      debtsCount,
      installmentsDueTomorrow,
      overdueInstallments,
    ] = await Promise.all([
      Account.findAll({
        where: { user_id: userId },
      }),

      Transaction.count({
        where: { user_id: userId },
      }),

      Category.count({
        where: { user_id: userId },
      }),

      Debt.count({
        where: { user_id: userId },
      }),

      Installment.findAll({
        include: [
          {
            model: Debt,
            as: "debt",
            where: { user_id: userId },
            attributes: ["id", "title"],
          },
        ],
        where: {
          due_date: {
            [Op.between]: [startOfTomorrow, endOfTomorrow],
          },
          status: false,
        },
        order: [["due_date", "ASC"]],
      }),

      Installment.findAll({
        include: [
          {
            model: Debt,
            as: "debt",
            where: { user_id: userId },
            attributes: ["id", "title"],
          },
        ],
        where: {
          due_date: {
            [Op.lt]: startOfToday,
          },
          status: false,
        },
        order: [["due_date", "ASC"]],
      }),
    ]);

    const totalBalance = accounts.reduce((acc, account) => {
      return acc + Number(account.balance || 0);
    }, 0);

    const warnings = [];

    installmentsDueTomorrow.forEach((installment) => {
      warnings.push({
        id: `installment-due-tomorrow-${installment.id}`,
        show: true,
        message: `A parcela ${installment.installment_number} de "${installment.debt.title}" vence amanhã`,
      });
    });

    overdueInstallments.forEach((installment) => {
      warnings.push({
        id: `installment-overdue-${installment.id}`,
        show: true,
        message: `A parcela ${installment.installment_number} de "${installment.debt.title}" está atrasada`,
      });
    });

    if (totalBalance <= 0) {
      warnings.push({
        id: "low-balance",
        show: true,
        message: "Seu saldo está baixo ou zerado",
      });
    }

    return {
      totalBalance,
      warnings,
      summaries: {
        transactions: transactionsCount,
        categories: categoriesCount,
        accounts: accounts.length,
        debts: debtsCount,
      },
    };
  },
};
