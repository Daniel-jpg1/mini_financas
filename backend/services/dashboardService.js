module.exports = {
  async getSummary() {
    return {
      totalBalance: 100,
      warnings: [
        { id: 1, show: true, message: "Parcela vence amanhã" },
        { id: 2, show: false, message: "Saldo baixo" },
      ],
      summaries: {
        transactions: 10,
        categories: 4,
        accounts: 2,
        debts: 1,
      },
    };
  },
};
