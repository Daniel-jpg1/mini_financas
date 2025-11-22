const User = require("./Users");
const Category = require("./Categories");
const Transaction = require("./Transactions");
const Installment = require("./Installments");
const History = require("./Historys");
const Account = require("./Accounts");
const Debt = require("./Debts");

//Account FK -------------------------------------------------------------

// Account → User
Account.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Account, { foreignKey: "user_id" });

//Category FK -------------------------------------------------------------

// Category → User
Category.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Category, { foreignKey: "user_id" });

// Category → Account
Category.belongsTo(Account, { foreignKey: "account_id" });
Account.hasMany(Category, { foreignKey: "account_id" });

//Debt FK -----------------------------------------------------------------

// Debt → User
Debt.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Debt, { foreignKey: "user_id" });

// Debt → Account
Debt.belongsTo(Account, { foreignKey: "account_id" });
Account.hasMany(Debt, { foreignKey: "account_id" });

//History FK --------------------------------------------------------------

History.belongsTo(User, { foreignKey: "user_id" });

//Installment FK ----------------------------------------------------------

//Installment → Account
Installment.belongsTo(Account, { foreignKey: "account_id"});
Account.hasMany(Installment, { foreignKey: "account_id"});

//Installment → Debt
Installment.belongsTo(Debt, { foreignKey: "debt_id"});
Debt.hasMany(Installment, { foreignKey: "debt_id"});

//Transaction FK ----------------------------------------------------------

// Transaction → User
Transaction.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Transaction, { foreignKey: "user_id" });

// Transaction → Account
Transaction.belongsTo(Account, { foreignKey: "account_id" });
Account.hasMany(Transaction, { foreignKey: "account_id" });

// Transaction → Category
Transaction.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Transaction, { foreignKey: "category_id" });

module.exports = {
  User,
  Category,
  Transaction,
  Account,
  Debt, 
  Installment,
  History,
};
