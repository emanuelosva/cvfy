const { BusinessError } = require('./BusinessError')

const toBusinessError = (error, module = 'cvfy') => {
  if (error instanceof BusinessError) return error
  return new BusinessError(module, error.message)
}

module.exports = toBusinessError
