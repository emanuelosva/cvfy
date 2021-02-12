const { BuildBusinessError } = require('@cvfy/common-module')
const config = require('../config')

const ModuleError = new BuildBusinessError(config.moduleName)

module.exports.ProfileErrors = {
  throw: ModuleError.throwError,
  types: {
    INVALID_ID: 'invalid profile id',
  },
}
