const mongoose = require('mongoose')
const { Logger } = require('@cvfy/common-module')
const config = require('./config')

const logger = new Logger('mongodb-connection-module', 'error')

const createMongooseConnection = () => {
  const MongoConnection = mongoose.createConnection(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 10,
  })

  handleConnectionEvents(MongoConnection)

  return MongoConnection
}

const handleConnectionEvents = (connection) => {
  connection.on('error', (error) => {
    logger.error(`Connection error event: ${error.message}`)
    process.exit(1)
  })

  connection.on('connected', () => logger.info('Mongo DB - connection stablished'))
  connection.on('disconnected', () => logger.info('Mongoose connection is disconnected'))

  process.on('SIGINT', () => {
    connection.close(() => {
      logger.info('Mongoose connection is disconnected due to application termination')
      process.exit(1)
    })
  })
}

module.exports = createMongooseConnection
