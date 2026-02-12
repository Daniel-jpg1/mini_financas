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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ["user_id", "name"],
      name: "account_user_unique"
    }
  ]
});

module.exports = Account;
