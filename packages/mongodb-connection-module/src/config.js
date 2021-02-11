const path = require('path')
const { getEnvPrefix } = require('@cvfy/common-module')

require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
})

const prefix = getEnvPrefix()

module.exports = {
  MONGO_URI: process.env[`${prefix}MONGO_URI`],
}
