const Joi = require("joi");

module.exports = Joi.object({
  debt_id: Joi.number().integer().required(),
  installment_number: Joi.number().integer().positive().required(),
  amount: Joi.number().positive().required(),
  due_date: Joi.date().required()
});
