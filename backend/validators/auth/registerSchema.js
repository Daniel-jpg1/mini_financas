const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.base": "O nome deve ser um texto.",
      "string.empty": "O nome é obrigatório.",
      "string.min": "O nome deve ter pelo menos 2 caracteres.",
      "string.max": "O nome deve ter no máximo 100 caracteres.",
      "any.required": "O nome é obrigatório."
    }),

  email: Joi.string()
    .email()
    .pattern(/^.{5,30}@/)
    .required()
    .messages({
      "string.email": "Insira um e-mail válido.",
      "string.empty": "O e-mail é obrigatório.",
      "string.pattern.base": "O e-mail deve ter entre 5 e 30 caracteres antes do @.",
      "any.required": "O e-mail é obrigatório."
    }),

  password: Joi.string()
    .pattern(/^\S+$/)
    .min(6)
    .max(100)
    .required()
    .messages({
      "string.pattern.base": "O e-mail não pode conter espaços",
      "string.min": "A senha deve ter pelo menos 6 caracteres.",
      "string.max": "A senha deve ter no máximo 100 caracteres.",
      "string.empty": "A senha é obrigatória.",
      "any.required": "A senha é obrigatória."
    })
});
