const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const History = sequelize.define("History", {
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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
    total_income: {
    type: DataTypes.DECIMAL (10, 2),
    defaultValue: 0
  },
    total_expense: {
    type: DataTypes.DECIMAL (10, 2),
    defaultValue: 0
  },
    balance: {
    type: DataTypes.DECIMAL (10, 2),
    defaultValue: 0
  }
});

module.exports = History; 
