const User = require("./User");
const Category = require("./Category");
const Transaction = require("./Transaction");
const Installment = require("./Installment");
const History = require("./History");
const Account = require("./Account");
const Debt = require("./Debt");

//Account FK -------------------------------------------------------------

// Account → User
Account.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Account, { foreignKey: "user_id" });

//Category FK -------------------------------------------------------------

// Category → User
Category.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Category, { foreignKey: "user_id" });

//Debt FK -----------------------------------------------------------------

// Debt → User
Debt.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Debt, { foreignKey: "user_id" });

// Debt → Account
Debt.belongsTo(Account, { foreignKey: "account_id" });
Account.hasMany(Debt, { foreignKey: "account_id" });

//History FK --------------------------------------------------------------

// History → User

History.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(History, { foreignKey: "user_id" });

// History → Account

History.belongsTo(Account, { foreignKey: "account_id" });
Account.hasMany(History, { foreignKey: "account_id" });

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

// Transaction → Installment
Transaction.belongsTo(Installment, { foreignKey: "installment_id" });
Installment.hasMany(Transaction, { foreignKey: "installment_id" });


module.exports = {
  User,
  Category,
  Transaction,
  Account,
  Debt, 
  Installment,
  History,
};
