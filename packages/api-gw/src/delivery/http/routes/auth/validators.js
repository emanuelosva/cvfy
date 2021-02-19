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

const newToken = {
  body: Joi.object({
    refreshToken: Joi.string().max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
  }),
}

const invalidateToken = {
  ...newToken,
}

module.exports = {
  login,
  signup,
  newToken,
  invalidateToken,
}
