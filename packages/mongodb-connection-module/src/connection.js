const mongoose = require('mongoose')
const { Logger } = require('@cvfy/common-module')
const config = require('./config')

const logger = new Logger('mongodb-connection-module')

mongoose.Promise = global.Promise

const createMongooseConnection = () => {
  const MongoConnection = mongoose.createConnection(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 8,
    /** @TODO configure db auth */
    // auth: {
    //   user: config.MONGO_USER,
    //   password: config.MONGO_PASSWORD,
    // },
  })

  handleConnectionEvents(MongoConnection)

  return MongoConnection
}

const handleConnectionEvents = (connection) => {
  connection.on('error', (error) => {
    logger.error(`Connection error event: ${error.message}`)
    process.exit(1)
  })

  connection.once('open', () => logger.info('Mongo DB connection open'))

  connection.on('connected', () => logger.info('Mongo DB - connection stablished'))
  connection.on('disconnected', () => logger.info('Mongo connection is disconnected'))

  process.on('SIGINT', () => {
    connection.close(() => {
      logger.info('Mongo connection is disconnected due to application termination')
      process.exit(1)
    })
  })
}

module.exports = createMongooseConnection
