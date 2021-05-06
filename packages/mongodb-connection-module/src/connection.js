const mongoose = require('mongoose')
const { Logger } = require('@cvfy/common-module')
const config = require('./config')

const logger = new Logger('mongodb-connection-module')

mongoose.Promise = global.Promise

const MongoConnection = mongoose.createConnection(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 10,
  auth: {
    user: config.MONGO_USER,
    password: config.MONGO_PASSWORD,
  },
})

MongoConnection.on('error', (error) => {
  logger.error(`Connection error event: ${error.message}`)
  process.exit(1)
})

MongoConnection.once('open', () => logger.info('Mongo DB connection open'))
MongoConnection.on('connected', () => logger.info('Mongo DB - connection stablished'))
MongoConnection.on('disconnected', () => logger.info('Mongo connection is disconnected'))

process.on('SIGINT', () => {
  MongoConnection.close(() => {
    logger.info('Mongo connection is disconnected due to application termination')
    process.exit(1)
  })
})

module.exports = MongoConnection
