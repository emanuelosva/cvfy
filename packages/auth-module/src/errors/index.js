const { BuildBusinessError } = require('@cvfy/common-module')
const config = require('../config')

const ModuleError = new BuildBusinessError(config.moduleName)

const AuthErrors = {
  throw: ModuleError.throwError,
  types: {
    INVALID_REFRESH_TOKEN: 'invalid refresh token',
    TOKEN_INVALID: 'user not found',
    TOKEN_EXPIRED: 'token has expired',
  },
}

module.exports.AuthErrors = AuthErrors
