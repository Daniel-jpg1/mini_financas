const User = require("./User");
const Category = require("./Category");
const Transaction = require("./Transaction");
const Installment = require("./Installment");
const History = require("./History");
const Account = require("./Account");
const Debt = require("./Debt");

//Account FK -------------------------------------------------------------

// Account → User
Account.belongsTo(User, { 
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
User.hasMany(Account, { 
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

//Category FK -------------------------------------------------------------

// Category → User
Category.belongsTo(User, { 
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
User.hasMany(Category, { 
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

//Debt FK -----------------------------------------------------------------

// Debt → User
Debt.belongsTo(User, { 
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
User.hasMany(Debt, { 
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Debt → Account
Debt.belongsTo(Account, { 
  foreignKey: "account_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Account.hasMany(Debt, { 
  foreignKey: "account_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

//History FK --------------------------------------------------------------

// History → User
History.belongsTo(User, { 
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
User.hasMany(History, { 
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// History → Account
History.belongsTo(Account, { 
  foreignKey: "account_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Account.hasMany(History, { 
  foreignKey: "account_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

//Installment FK ----------------------------------------------------------

// Installment → Account
Installment.belongsTo(Account, { 
  foreignKey: "account_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Account.hasMany(Installment, { 
  foreignKey: "account_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Installment → Debt
Installment.belongsTo(Debt, { 
  foreignKey: "debt_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Debt.hasMany(Installment, { 
  foreignKey: "debt_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

//Transaction FK ----------------------------------------------------------

// Transaction → User
Transaction.belongsTo(User, { 
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
User.hasMany(Transaction, { 
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Transaction → Account
Transaction.belongsTo(Account, { 
  foreignKey: "account_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Account.hasMany(Transaction, { 
  foreignKey: "account_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Transaction → Category
Transaction.belongsTo(Category, { 
  foreignKey: "category_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});
Category.hasMany(Transaction, { 
  foreignKey: "category_id"
});

// Transaction → Installment
Transaction.belongsTo(Installment, { 
  foreignKey: "installment_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Installment.hasMany(Transaction, { 
  foreignKey: "installment_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});


module.exports = {
  User,
  Category,
  Transaction,
  Account,
  Debt, 
  Installment,
  History,
};
