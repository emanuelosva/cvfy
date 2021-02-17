const path = require('path')

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

module.exports = {
  moduleName: 'api-gateway',
  PORT: process.env.PORT || 3000,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  cors: {
    ORIGINS: process.env.CORS_ORIGINS?.split(',') || '*',
  },
  security: {
    MAX_REQUEST_PER_MINUTE: process.env.MAX_REQUEST_PER_MINUTE || 60,
    SECRET: process.env.SECRET || 'secret',
  },
}
