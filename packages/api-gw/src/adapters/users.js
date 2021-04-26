const { userService } = require('@cvfy/users-module')
const { ApiError } = require('../errors')
const { constants, httpStatus } = require('../utils')

async function createAdminUser(request, reply) {
  const { body: userDTO } = request

  const user = await userService.createOne({ ...userDTO, type: constants.users.enumTypes.ADMIN })
  reply.code(201).send({ user })
}

async function createUser(request, reply) {
  const { body: userDTO } = request

  const user = await userService.createOne({ ...userDTO, type: constants.users.enumTypes.USER })
  reply.code(201).send({ user })
}

async function findOneUser(request, reply) {
  const { params: { id } } = request

  const user = await userService.findById(id)
  if (!user) ApiError.throw(`user with id: ${id} not found`, httpStatus.notFound)

  reply.code(httpStatus.ok).send({ user })
}

async function updateOneUser(request, reply) {
  const { user, params: { id }, body: userDTO } = request

  if (user.id !== id) ApiError.throw(ApiError.types.FORBIDDEN)

  const updatedUser = await userService.updateOne(id, userDTO)
  reply.code(httpStatus.ok).send({ user: updatedUser })
}

module.exports = {
  createAdminUser,
  createUser,
  findOneUser,
  updateOneUser,
}
