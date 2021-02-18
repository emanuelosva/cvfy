const makeAuthService = require('./authentication')

describe('Auth - UseCases', () => {
  describe('getNewToken', () => {
    test('it should return the refresh access token if a valid refreshToken is passed', async () => {
      // Arrange
      const refreshToken = 'valid-refresh-token'
      const tokenData = { refreshToken, isValid: true, owner: 'id', scope: 'scope' }
      const jwt = 'joseHeader.payload.config'
      const dependencies = {
        RefreshTokenModel: {
          findOne: jest.fn(() => Promise.resolve(tokenData)),
        },
        JWT: {
          sign: jest.fn(() => Promise.resolve(jwt)),
        },
      }

      // Act
      const authService = makeAuthService(dependencies)
      const token = await authService.getNewToken({ refreshToken })

      // Asserts
      expect(token).toEqual(jwt)
      expect(dependencies.RefreshTokenModel.findOne).toHaveBeenCalledWith({ refreshToken })
      expect(dependencies.JWT.sign).toHaveBeenCalledWith({ owner: tokenData.owner, scope: tokenData.scope })
    })
    test('it should be rejected if the refreshToken is invalid or does not exists', async () => {
      // Arrange
      const refreshToken = 'valid-refresh-token'
      const dependencies = {
        RefreshTokenModel: {
          findOne: jest.fn(() => Promise.resolve(null)),
        },
      }

      // Act
      const authService = makeAuthService(dependencies)

      // Asserts
      await expect(authService.getNewToken({ refreshToken })).rejects.toThrow()
      expect(dependencies.RefreshTokenModel.findOne).toHaveBeenCalledWith({ refreshToken })
    })
    test('it should be rejected if the refreshToken does not valid', async () => {
      // Arrange
      const refreshToken = 'valid-refresh-token'
      const tokenData = { refreshToken, isValid: false, owner: 'id', scope: 'scope' }
      const dependencies = {
        RefreshTokenModel: {
          findOne: jest.fn(() => Promise.resolve(tokenData)),
        },
      }

      // Act
      const authService = makeAuthService(dependencies)

      // Asserts
      await expect(authService.getNewToken({ refreshToken })).rejects.toThrow()
      expect(dependencies.RefreshTokenModel.findOne).toHaveBeenCalledWith({ refreshToken })
    })
  })
})
