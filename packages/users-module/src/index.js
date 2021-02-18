const { UsersModel } = require('./domains')
const { makeUserUseCases } = require('./useCases')
const { UsersErrors } = require('./errors')

module.exports = {
  userService: makeUserUseCases({ UsersModel }),
  UsersErrors,
}
