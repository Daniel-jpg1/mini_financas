"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Debts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Accounts", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      type: {
        type: Sequelize.ENUM(
          "Pagar",
          "Receber",
          "Emprestimo",
          "Parcelamento",
          "Fatura"
        ),
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      number_installments: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      transaction_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // em Postgres, ENUM fica registrado no DB; remover evita erro em re-migration
    await queryInterface.dropTable("Debts");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Debts_status";'
    );
  },
};