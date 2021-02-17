const { httpStatus } = require('../../../utils')

function notFoundHandler(request, replay) {
  replay.code(httpStatus.notFound).send({
    error: true,
    message: 'Route not found',
    meta: {
      status: httpStatus.notFound,
      errorContex: {},
    },
  })
}

module.exports = notFoundHandler
