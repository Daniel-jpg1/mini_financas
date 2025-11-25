const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().min(2).required(),
  type: Joi.string().valid("wallet", "bank", "credit").required(),
  balance: Joi.number().min(0).required()
});
