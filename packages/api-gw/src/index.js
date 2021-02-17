const server = require('./delivery/http/server')
const config = require('./config')
const { logger } = require('./utils')

if (require.main) {
  server.listen(config.PORT, (error, address) => {
    if (error) {
      logger.error(error.message)
      process.exit(1)
    }

    logger.info(`🚀 Server listen on: ${address}`)
  })
}

module.exports = server
