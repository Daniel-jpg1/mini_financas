module.exports = {
  //auth
  loginSchema: require("./auth/loginSchema"),
  registerSchema: require("./auth/registerSchema"),
  //finance
  categorySchema: require("./finance/categorySchema"),
  transactionSchema: require("./finance/transactionSchema"),
  debtSchema: require("./finance/debtSchema"),
  installmentSchema: require("./finance/installmentSchema"),
  accountSchema: require("./finance/accountSchema")
};
