const { userService } = require('@cvfy/users-module')
const { authServices, AuthErrors } = require('@cvfy/auth-module')
const { httpStatus } = require('../../../utils')
const { ApiError } = require('../../../errors')

const getTokenFromHeaders = (headers) => {
  const authroization = headers.authorization
  if (authroization) ApiError.throw(ApiError.types.UNAUTHORIZED, httpStatus.unauthorized)

  let token
  try {
    token = authroization.split('Bearer ')[1]
  } catch (error) {
    ApiError.throw(ApiError.types.UNAUTHORIZED, httpStatus.unauthorized)
  }

  return token
}

async function isAuthenticated(request, replay) {
  try {
    const token = getTokenFromHeaders(request.headers)

    const { owner } = await authServices.verifyToken(token)
    const user = await userService.findById(owner)
    if (!user) throw new Error('')

    request.user = { id: user.id, type: user.type }
  } catch (error) {
    if (error.message === AuthErrors.types.TOKEN_EXPIRED) throw error
    ApiError.throw(ApiError.types.UNAUTHORIZED, httpStatus.unauthorized)
  }
}

function isRole(...roles) {
  return function(request, replay) {
    const { user } = request
    if (!roles.includes(user.type)) {
      ApiError.throw(ApiError.types.FORBIDDEN, httpStatus.forbiden)
    }
  }
}

module.exports = {
  isAuthenticated,
  isRole,
}
