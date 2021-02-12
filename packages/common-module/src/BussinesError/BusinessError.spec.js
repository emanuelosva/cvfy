const { BuildError } = require('./BusinessError')

describe('Error bussines', () => {
  describe('Business Error', () => {
    test('It should create a instance with correct properties', () => {
      // Arrange
      const module = 'test-module'

      // Act
      const BusinessError = new BuildError(module)

      // Expect
      expect(BusinessError.moduleName).toEqual(module)
    })
    test('It should have getError and throwError methods', () => {
      // Arrange
      const module = 'test-module'

      // Act
      const BusinessError = new BuildError(module)

      // Expect
      expect(BusinessError.getError).toBeDefined()
      expect(BusinessError.throwError).toBeDefined()
    })
    test('It should return an istance of BusinessError', () => {
      // Arrange
      const module = 'test-module'
      const message = 'test message'
      const status = 400

      // Act
      const BusinessError = new BuildError(module)
      const error = BusinessError.getError(message, status)

      // Expect
      expect(error.moduleName).toEqual(module)
      expect(error.message).toEqual(message)
      expect(error.status).toEqual(status)
      expect(error.data).toEqual({})
      expect(error.stack).toBeDefined()
    })
    test('It should throw and error', () => {
      // Arrange
      const module = 'test-module'
      const message = 'test message'
      const status = 400

      // Act
      const BusinessError = new BuildError(module)
      // Expect
      expect(() => BusinessError.throwError(message, status)).toThrow(message)
    })
  })
})
