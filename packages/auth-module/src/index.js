const { RefreshTokenModel } = require('./domains')
const { AuthErrors } = require('./errors')
const { makeAuthUseCases } = require('./useCases')
const JWT = require('./jwt')

module.exports = {
  authServices: makeAuthUseCases({ RefreshTokenModel, JWT }),
  AuthErrors,
}
