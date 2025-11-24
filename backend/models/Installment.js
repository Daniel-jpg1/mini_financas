const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Installment = sequelize.define("Installment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  debt_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  installment_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  paid_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
    description: {
    type: DataTypes.TEXT
  },
    transaction_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Installment;
