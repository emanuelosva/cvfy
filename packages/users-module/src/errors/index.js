const { BuildBusinessError } = require('@cvfy/common-module')

const ModuleError = new BuildBusinessError('users-module')

const UsersErrors = {
  throw: ModuleError.throwError,
  types: {
    EMAIL_EXISTS: 'email already exists',
    USER_NOT_FOUND: 'user not found',
    DATABASE_ERROR: 'databa error while save user',
  },
}

module.exports.UsersErrors = UsersErrors
