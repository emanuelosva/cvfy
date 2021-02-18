const { toBusinessError } = require('@cvfy/common-module')
const logger = require('../logger')
const { AuthErrors } = require('../errors')

const makeAuthServices = ({ RefreshTokenModel, JWT }) => {
  const createAccessToken = async ({ owner, scope }) => {
    logger.info('Creating a new jwt token')

    const token = await JWT.sign({ owner, scope })
    return token
  }

  const verifyToken = async (token) => {
    try {
      logger.info('Verifying and decoding a jwt token')

      const payload = await JWT.verifyAndGetPayload(token)
      const { owner, scope } = payload
      return { owner, scope }
    } catch (error) {
      logger.error(`Error on token verification: ${error.message}`)
      return Promise.reject(toBusinessError(error))
    }
  }

  const createRefreshToken = async ({ owner, scope }) => {
    try {
      logger.info(`Creating new refreshToken for: ${owner}`)

      const refreshToken = await RefreshTokenModel.create({ owner, scope })
      return refreshToken
    } catch (error) {
      logger.error(`Error on create new refreshToken: ${error.message}`)
      return Promise.reject(toBusinessError(error))
    }
  }

  const getNewToken = async ({ refreshToken }) => {
    try {
      logger.info('Refreshing access token')

      const tokenData = await RefreshTokenModel.findOne({ refreshToken })
      if (!tokenData) AuthErrors.throw(AuthErrors.types.INVALID_REFRESH_TOKEN, 403)

      const { owner, isValid, scope } = tokenData
      if (!isValid) AuthErrors.throw(AuthErrors.types.INVALID_REFRESH_TOKEN, 403)

      const token = await JWT.sign({ owner, scope })
      return token
    } catch (error) {
      logger.error(`Error on refresh access token: ${error.message}`)
      return Promise.reject(toBusinessError(error))
    }
  }

  const invalidateRefreshToken = async ({ refreshToken }) => {
    try {
      logger.info(`Invalidating refreshToken: ${refreshToken}`)

      await RefreshTokenModel.deleteOne({ refreshToken })
    } catch (error) {
      logger.error(`Error on invalidate refresh token: ${error.message}`)
      return Promise.reject(toBusinessError(error))
    }
  }

  const clearAllTokensFor = async ({ owner }) => {
    try {
      logger.info(`Removing all refresh tokens for: ${owner}`)

      await RefreshTokenModel.deleteMany({ owner })
    } catch (error) {
      logger.error(`Error on removing all refresh tokens: ${error.message}`)
      return Promise.reject(toBusinessError(error))
    }
  }

  return {
    createAccessToken,
    verifyToken,
    createRefreshToken,
    getNewToken,
    invalidateRefreshToken,
    clearAllTokensFor,
  }
}

module.exports = makeAuthServices
