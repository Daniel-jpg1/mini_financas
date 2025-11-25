const Joi = require("joi");

module.exports = Joi.object({
  title: Joi.string().min(2).required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("income", "expense").required(),
  category_id: Joi.number().integer().required(),
  account_id: Joi.number().integer().optional(), // se você quiser usar contas depois
  transaction_date: Joi.date().optional()
});
