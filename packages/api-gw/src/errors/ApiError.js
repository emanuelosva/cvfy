const { BuildBusinessError } = require('@cvfy/common-module')
const config = require('../config')

const ModuleError = new BuildBusinessError(config.moduleName)

module.exports = {
  throw: ModuleError.throwError,
  types: {
    UNAUTHORIZED: 'invalid credentials',
    FORBIDDEN: 'you have not access to this resource',
  },
}
