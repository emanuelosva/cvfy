const userEndpoints = require('./endpoints')

module.exports = async function(fastify) {
  userEndpoints.forEach(function(route) {
    fastify.route(route)
  })
}
