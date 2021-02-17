const { errorHandler } = require('../../../errors')
const { httpStatus, logger } = require('../../../utils')

function centralErrorHandler(error, request, replay) {
  const apiError = errorHandler.handleApiError(error)
  const status = apiError.status || error.code || error.statusCode || httpStatus.serverError

  logger.error(apiError.toString())

  replay.code(status).send({
    error: true,
    message: apiError.message || error.message,
    meta: {
      status,
      errorContex: {
        ...apiError.data,
        ...error.validation,
      },
    },
  })
}

module.exports = centralErrorHandler
