const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Category = sequelize.define("Category", {
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
   description: {
    type: DataTypes.TEXT
  }
});

module.exports = Category;
