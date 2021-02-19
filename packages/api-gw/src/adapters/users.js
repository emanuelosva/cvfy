const { userService } = require('@cvfy/users-module')
const { ApiError } = require('../errors')
const { constants, httpStatus } = require('../utils')

async function createAdminUser(request, replay) {
  const { body: userDTO } = request

  const user = await userService.createOne({ ...userDTO, type: constants.users.enumTypes.ADMIN })
  replay.code(201).send({ user })
}

async function createUser(request, replay) {
  const { body: userDTO } = request

  const user = await userService.createOne({ ...userDTO, type: constants.users.enumTypes.USER })
  replay.code(201).send({ user })
}

async function findOneUser(request, replay) {
  const { params: { id } } = request

  const user = await userService.findById(id)
  if (!user) ApiError.throw(`user with id: ${id} not found`, httpStatus.notFound)

  replay.code(httpStatus.ok).send({ user })
}

async function updateOneUser(request, replay) {
  const { user, params: { id }, body: userDTO } = request

  if (user.id !== id) ApiError.throw(ApiError.types.FORBIDDEN)

  const updatedUser = await userService.updateOne(id, userDTO)
  replay.code(httpStatus.ok).send({ user: updatedUser })
}

module.exports = {
  createAdminUser,
  createUser,
  findOneUser,
  updateOneUser,
}
