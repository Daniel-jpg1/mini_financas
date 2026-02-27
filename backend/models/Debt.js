"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Debt = sequelize.define(
  "Debt",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM(
        "Pagar",
        "Receber",
        "Emprestimo",
        "Parcelamento",
        "Fatura"
      ),
      allowNull: false,
      defaultValue: "Pagar",
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },

    number_installments: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Debts",
    timestamps: true, // cria/usa createdAt e updatedAt automaticamente
    underscored: false,
  }
);

module.exports = Debt;