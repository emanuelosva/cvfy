const profileEndpoints = require('./endpoints')

module.exports = async function(fastify) {
  profileEndpoints.forEach(function(route) {
    fastify.route(route)
  })
}
