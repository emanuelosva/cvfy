const profileEndpoints = require('./endpoints')

module.exports = function(fastify) {
  profileEndpoints.forEach(route => {
    fastify.route(route)
  })
}
