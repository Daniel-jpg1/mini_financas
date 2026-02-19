const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().trim().min(2),               
  description: Joi.string().trim().allow("").max(500) 
}).min(1); 
