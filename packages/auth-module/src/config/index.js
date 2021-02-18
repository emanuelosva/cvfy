const path = require('path')

require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
})

module.exports = {
  moduleName: 'auth-module',
  SECRET: process.env.SECRET || 'secret',
  ALGORITHM: process.env.ALGORITHM || 'HS256',
}
