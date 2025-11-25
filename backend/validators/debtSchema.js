const Joi = require("joi");

module.exports = Joi.object({
  title: Joi.string().min(2).required(),
  total_amount: Joi.number().positive().required(),
  description: Joi.string().allow(null, "").optional(),
  due_date: Joi.date().optional() // se você quiser permitir data final da dívida
});
