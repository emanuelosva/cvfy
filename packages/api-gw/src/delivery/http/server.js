const { default: fastify } = require('fastify')
const { default: helmet } = require('fastify-helmet')
const { default: cors } = require('fastify-cors')
const { default: rateLimit } = require('fastify-rate-limit')
const { notFoundHandler, centralErrorHandler } = require('./middleware')
const config = require('../../config')

/**
 * App config
 */
const app = fastify({
  logger: true,
  trustProxy: true,
})

/**
 * Validation input
 */
app.setValidatorCompiler(({ schema }) => {
  return (data) => schema.validate(data)
})

/**
 * Middlewares
 */
app
  .register(helmet)
  .register(cors, {
    origin: config.IS_PRODUCTION ? config.cors.ORIGINS : '*',
    credentials: true,
  })
  .register(rateLimit, {
    timeWindow: '1 minute',
    max: config.security.MAX_REQUEST_PER_MINUTE,
  })

/**
 * Routing
 */
app
  .register(require('./routes').authRoutes, { prefix: '/api/auth' })
  .register(require('./routes').userRoutes, { prefix: '/api/users' })
  .register(require('./routes').profileRoutes, { prefix: '/api/profiles' })

/**
 * Error handlers
 */
app
  .setNotFoundHandler(notFoundHandler)
  .setErrorHandler(centralErrorHandler)

module.exports = app
