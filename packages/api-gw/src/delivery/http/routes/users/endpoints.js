const { users } = require('../../../../adapters')
const usersValidators = require('./validators')
const { auth } = require('../../middleware')
const { constants } = require('../../../../utils')

module.exports = [
  {
    method: 'POST',
    url: '/admin',
    schema: { ...usersValidators.createOne },
    preValidation: [auth.isAuthenticated, auth.isRole(constants.users.enumTypes.ADMIN)],
    handler: users.createAdminUser,
  },
  {
    method: 'POST',
    url: '/',
    schema: { ...usersValidators.createOne },
    handler: users.createUser,
  },
  {
    method: 'GET',
    url: '/:id',
    schema: { ...usersValidators.findOne },
    preValidation: [auth.isAuthenticated],
    handler: users.findOneUser,
  },
  {
    method: 'PUT',
    url: '/:id',
    schema: { ...usersValidators.updateOne },
    preValidation: [auth.isAuthenticated],
    handler: users.updateOneUser,
  },
]
