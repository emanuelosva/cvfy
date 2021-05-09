const { userService } = require('@cvfy/users-module')
const { authServices, AuthErrors } = require('@cvfy/auth-module')
const { ApiError } = require('../../errors')

const createContext = async ({ request }) => {
  const { user, authError } = await getAuthenticatedUser(request)

  return {
    user,
    authError,
  }
}

const getAuthenticatedUser = async (request) => {
  const { authorization = '' } = request.headers
  const token = authorization.replace('Bearer ', '')

  let user, authError
  try {
    const { owner } = await authServices.verifyToken(token)
    user = await userService.findById(owner)
  } catch (error) {
    try {
      if (error.message === AuthErrors.types.TOKEN_EXPIRED) throw error
      ApiError.throw(ApiError.types.UNAUTHORIZED, 401)
    } catch (error) {
      authError = error
    }
  }

  return { user, authError }
}

module.exports = {
  createContext,
}
