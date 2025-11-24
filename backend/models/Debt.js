const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Debt = sequelize.define("Debt", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
   account_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM("Pagar", "Receber", "Emprestimo", "Parcelamento", "Fatura"),
    allowNull: false
  },
    title: {
    type: DataTypes.STRING,
    allowNull: false
  },
    total_amount: {
    type: DataTypes.DECIMAL (10, 2),
    allowNull: false
  },
    due_date: {
    type: DataTypes.DATEONLY
  },
    number_installments: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
   description: {
    type: DataTypes.TEXT
  },
   transaction_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Debt;
