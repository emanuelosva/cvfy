const winston = require('winston')
const { format, transports } = winston

class Logger {
  /**
   * Return a logger instance with levels:
   * info, debug, warn and error.
   * @param {string} module - eventlly module name
   */
  constructor(module) {
    this.module = module
    this._logger = winston.createLogger({
      format: format.combine(
        format.timestamp(),
        format.simple(),
      ),
      transports: ['error'].map((logFile) => new transports.File({
        filename: `${logFile}.log`,
        level: logFile,
      })),
    })

    if (process.env.NODE_ENV !== 'production') {
      this._logger.add(new transports.Console({
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ssZ' }),
          format.colorize(),
          format.simple(),
        ),
      }))
    }
  }

  info(message, ...args) {
    this._log('info', message, args)
  }

  debug(message, ...args) {
    this._log('debug', message, args)
  }

  warn(message, ...args) {
    this._log('warn', message, args)
  }

  error(message, ...args) {
    this._log('error', message, args)
  }

  _log(level, message, ...args) {
    this._logger[level](`[@cvfy_${this.module}] --> ${message} | `, args)
  }
}

module.exports = Logger
