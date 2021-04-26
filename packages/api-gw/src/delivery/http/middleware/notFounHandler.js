const { httpStatus } = require('../../../utils')

function notFoundHandler(request, reply) {
  reply.code(httpStatus.notFound).send({
    error: true,
    message: 'Route not found',
    meta: {
      status: httpStatus.notFound,
      errorContex: {},
    },
  })
}

module.exports = notFoundHandler
