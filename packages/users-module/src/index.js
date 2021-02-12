const { UsersModel } = require('./domains')
const { userUseCases } = require('./useCases')

module.exports = {
  createOneUser: userUseCases.makeCreateUser({ UsersModel }),
  findByEmail: userUseCases.makeFindUserByEmail({ UsersModel }),
  findById: userUseCases.makeFindUserById({ UsersModel }),
  updateOne: userUseCases.makeUpdateUser({ UsersModel }),
}
