const { Logger } = require('@cvfy/common-module')
const config = require('../config')

const logger = new Logger(config.moduleName)
module.exports = logger
