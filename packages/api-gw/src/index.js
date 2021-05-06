const server = require('./delivery/http/server')
const config = require('./config')
const { logger } = require('./utils')
const { errorHandler } = require('./errors')

if (require.main === module) {
  server.listen(config.PORT, (error, address) => {
    if (error) {
      logger.error(error.message)
      logger.error(error.stack)
      process.exit(1)
    }

    logger.info(`🚀 Server listen on: ${address}`)
  })

  process.on('unhandledRejection', errorHandler.handleFatalError)
  process.on('uncaughtException', errorHandler.handleFatalError)
}

module.exports = server
module.exports.default = server
