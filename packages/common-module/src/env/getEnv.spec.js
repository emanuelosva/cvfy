const makeGetEnviroment = require('./index')
const { enviroment } = require('../constants')

describe('getEnvironment', () => {
  describe('Success prefix', () => {
    test('when a valid NODE_ENV is defined it should return a valid prefix', () => {
      // Arrange
      const dependencies = {
        BusinessError: {
          throwError: jest.fn(() => { throw new Error() }),
        },
      }

      // Act
      const getEnvironment = makeGetEnviroment(dependencies)
      process.env.NODE_ENV = enviroment.DEVELOPMENT
      const prefix = getEnvironment()

      // Asserts
      expect(prefix).toEqual('DEVELOPMENT_')
    })
  })
  describe('Invalid prefix', () => {
    test('when an invalid NODE_ENV is defined it should trhow an error', () => {
      // Arrange
      const dependencies = {
        BusinessError: {
          throwError: jest.fn(() => { throw new Error() }),
        },
      }

      // Act
      const getEnvironment = makeGetEnviroment(dependencies)
      process.env.NODE_ENV = 'invalid-env'

      // Asserts
      expect(() => getEnvironment()).toThrow()
    })
    test('when any env is defined it should trhow an error', () => {
      // Arrange
      const dependencies = {
        BusinessError: {
          throwError: jest.fn(() => { throw new Error() }),
        },
      }

      // Act
      const getEnvironment = makeGetEnviroment(dependencies)
      process.env.NODE_ENV = undefined

      // Asserts
      expect(() => getEnvironment()).toThrow()
    })
  })
})
