const users = require('@cvfy/users-module')
const bcrypt = require('bcrypt')
const { ApiError } = require('../errors')
const { JWT, constants, httpStatus } = require('../utils')

async function login(request, replay) {
  const { body: { email, password } } = request

  const user = await users.findByEmail(email)
  const userPassword = user && user.password

  const canLogIn = await bcrypt.compare(password, userPassword)
  if (!canLogIn) ApiError.throw(ApiError.types.UNAUTHORIZED, 401)

  const token = await JWT.sign({ email, types: user.type })

  replay.code(httpStatus.ok).send({ token, user })
}

async function signup(reques, replay) {
  const { body: userDTO } = reques

  const user = await users.createOneUser({ ...userDTO, type: constants.users.enumTypes.USER })
  const token = await JWT.sign({ email: user.email, type: user.type })

  replay.code(httpStatus.created).send({ token, user })
}

module.exports = {
  login,
  signup,
}
