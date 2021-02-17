const users = require('@cvfy/users-module')
const { JWT, httpStatus } = require('../../../utils')
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

    const { email } = await JWT.decode(token)
    const user = await users.findByEmail(email)
    if (!user) throw new Error('')

    request.user = { id: user.id, type: user.type }
  } catch (error) {
    ApiError.throw(ApiError.types.UNAUTHORIZED, httpStatus.unauthorized)
  }
}

async function isRole(...roles) {
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
