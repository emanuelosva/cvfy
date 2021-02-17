const { BuildBusinessError } = require('@cvfy/common-module')
const config = require('../config')

const ModuleError = new BuildBusinessError(config.moduleName)

module.exports.ProfileErrors = {
  throw: ModuleError.throwError,
  types: {
    INVALID_ID: 'invalid profile id',
    PROFILE_NOT_EXISTS: 'profile does not exists',
    ONLY_OWNER_CAN_PERFOMR_IT: 'only the owner can perform this operation',
    relatedNotExists: (name) => `${name} does not exists`,
  },
}
