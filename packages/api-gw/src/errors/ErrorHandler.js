const { httpStatus, logger } = require('../utils')

class ErrorHandler {
  static handleApiError(error) {
    const isOperational = !error.status

    if (!isOperational) return error

    error.status = httpStatus.serverError
    logger.error('Opeartional error ocurrend. Stack:')
    logger.error(error.stack)

    /** @TODO send email to admin on operation erro */

    return error
  }

  static handleFatalError(error) {
    logger.error(`Fatal error ocurred: ${error.message}`)
    process.exit(1)
  }
}

module.exports = ErrorHandler
