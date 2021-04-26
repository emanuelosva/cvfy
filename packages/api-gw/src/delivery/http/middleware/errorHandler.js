const { errorHandler } = require('../../../errors')
const { httpStatus, logger } = require('../../../utils')

function centralErrorHandler(error, request, reply) {
  const defaultStatusCode = error.validationContext ? httpStatus.badRequest : httpStatus.serverError
  error.status = error.status ? error.status : defaultStatusCode

  const apiError = errorHandler.handleApiError(error)

  logger.error(apiError.toString())

  reply.code(apiError.status).send({
    error: true,
    message: apiError.message || error.message,
    meta: {
      status: apiError.status,
      errorContex: {
        ...apiError.data,
        ...(error.validationContext && { path: error.validationContext }),
      },
    },
  })
}

module.exports = centralErrorHandler
