const { BuildBusinessError, toBusinessError } = require('./BussinesError')
const makeGetEnvPrefix = require('./env')

const BusinessError = new BuildBusinessError('common-module')

module.exports.Logger = require('./logger')
module.exports.constants = require('./constants')
module.exports.slugify = require('./slugify')
module.exports.validators = require('./validators')
module.exports.toBusinessError = toBusinessError
module.exports.BuildBusinessError = BuildBusinessError
module.exports.getEnvPrefix = makeGetEnvPrefix({ BusinessError })
