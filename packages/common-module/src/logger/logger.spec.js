const Logger = require('./index')

describe('Logger', () => {
  describe('Logger properties', () => {
    test('It should have the module passed in constructor', () => {
      // Arrange
      const module = 'test-module'

      // Act
      const logger = new Logger(module)

      // Asserts
      expect(logger.module).toEqual(module)
    })
    test('It should have the number of transports passed', () => {
      // Arrange
      const module = 'test-module'
      const transports = ['info', 'error', 'warn']
      const defaultLengthTransport = 1

      // Act
      const logger = new Logger(module, ...transports)

      // Asserts
      expect(logger._logger.transports).toHaveLength(transports.length + defaultLengthTransport)
    })
    test('It should have the public methods, info, error, debug, warn', () => {
      // Arrange
      const module = 'test-module'
      const info = 'test info'
      const debug = 'test debug'
      const warn = 'test warn'
      const error = 'test error'

      // Act
      const logger = new Logger(module)
      const _logger = jest.spyOn(logger, '_log')
      const logInfo = jest.spyOn(logger, 'info')
      const logDebug = jest.spyOn(logger, 'debug')
      const logError = jest.spyOn(logger, 'error')
      const logWarn = jest.spyOn(logger, 'warn')
      logger.info(info)
      logger.debug(debug)
      logger.warn(warn)
      logger.error(error)

      // Asserts
      expect(logInfo).toHaveBeenCalled()
      expect(logDebug).toHaveBeenCalled()
      expect(logWarn).toHaveBeenCalled()
      expect(logError).toHaveBeenCalled()
      expect(_logger).toBeCalled()
    })
  })
})
