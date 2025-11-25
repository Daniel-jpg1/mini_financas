const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Account = sequelize.define("Account", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  account_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  opening_balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ["user_id", "account_name"],
      name: "account_user_unique"
    }
  ]
});

module.exports = Account;
