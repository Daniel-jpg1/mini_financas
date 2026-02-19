const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().trim().min(2).required(),
  description: Joi.string().trim().allow("").max(500).optional()
});
