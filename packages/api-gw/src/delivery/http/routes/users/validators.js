const Joi = require('joi')
const { constants: { inputs } } = require('../../../../utils')

const createOne = {
  body: Joi.object({
    email: Joi.string().email().max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
    name: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
    password: Joi.string().regex(inputs.PASSWORD_REGEX).required(),
  }),
}

const findOne = {
  params: {
    id: Joi.string().regex(inputs.MONGO_ID_REGEX).message('invalid id').required(),
  },
}

const updateOne = {
  params: {
    id: Joi.string().regex(inputs.MONGO_ID_REGEX).message('invalid id').required(),
  },
  body: Joi.object({
    email: Joi.string().email().max(inputs.MAX_GENERAL_STRING_LENGTH),
    name: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
  }),
}

module.exports = {
  createOne,
  findOne,
  updateOne,
}
