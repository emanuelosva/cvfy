const bcrypt = require('bcrypt')
const { userService } = require('@cvfy/users-module')
const { authServices } = require('@cvfy/auth-module')
const { ApiError } = require('../../../errors')
const { constants, httpStatus } = require('../../../utils')

async function login(request, reply) {
  const { body: { email, password } } = request

  const user = await userService.findByEmail(email)
  const userPassword = user && user.password

  const canLogIn = await bcrypt.compare(password, userPassword)
  if (!canLogIn) ApiError.throw(ApiError.types.UNAUTHORIZED, 401)

  const accessToken = await authServices.createAccessToken({ owner: user.id, scope: user.type })
  const refreshToken = await authServices.createRefreshToken({ owner: user.id, scope: user.type })

  reply.code(httpStatus.ok).send({ refreshToken, accessToken, user })
}

async function signup(request, reply) {
  const { body: userDTO } = request

  const user = await userService.createOne({ ...userDTO, type: constants.users.enumTypes.USER })
  const accessToken = await authServices.createAccessToken({ owner: user.id, scope: user.type })
  const refreshToken = await authServices.createRefreshToken({ owner: user.id, scope: user.type })

  reply.code(httpStatus.created).send({ refreshToken, accessToken, user })
}

async function refreshAccessToken(request, reply) {
  const { body: { refreshToken } } = request

  const accessToken = await authServices.getNewToken({ refreshToken })
  reply.code(httpStatus.ok).send({ accessToken })
}

async function invalidateRefreshToken(request, reply) {
  const { body: { refreshToken } } = request

  await authServices.invalidateRefreshToken({ refreshToken })
  reply.code(httpStatus.ok).send({ success: true })
}

async function clearAllTokens(request, reply) {
  const { user } = request

  await authServices.clearAllTokensFor({ owner: user.id })
  reply.code(httpStatus.ok).send({ success: true })
}

module.exports = {
  login,
  signup,
  refreshAccessToken,
  invalidateRefreshToken,
  clearAllTokens,
}
