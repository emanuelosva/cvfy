const userEndpoints = require('./endpoints')

module.exports = function(fastify) {
  userEndpoints.forEach(route => {
    fastify.route(route)
  })
}
