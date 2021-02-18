const authEndpoints = require('./endpoints')

module.exports = async function(fastify) {
  authEndpoints.forEach(function(route) {
    fastify.route(route)
  })
}
