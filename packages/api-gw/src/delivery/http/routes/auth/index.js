const authEndpoints = require('./endpoints')

module.exports = function(fastify) {
  authEndpoints.forEach(route => {
    fastify.route(route)
  })
}
