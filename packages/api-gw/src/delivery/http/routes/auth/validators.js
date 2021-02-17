const Joi = require('joi')
const { constants: { inputs } } = require('../../../../utils')

const login = {
  body: Joi.object({
    email: Joi.string().email().max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
    password: Joi.string().max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
  }),
}

const signup = {
  body: Joi.object({
    email: Joi.string().email().max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
    name: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
    password: Joi.string().regex(inputs.PASSWORD_REGEX).required(),
  }),
}

module.exports = {
  login,
  signup,
}
