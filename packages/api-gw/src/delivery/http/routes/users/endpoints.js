const { users } = require('../../../../adapters')
const usersValidators = require('./validators')
const { auth } = require('../../middleware')
const { constants } = require('../../../../utils')

module.exports = [
  {
    method: 'POST',
    url: '/admin',
    schema: {
      body: usersValidators.createOne.body,
    },
    preValidation: [auth.isAuthenticated, auth.isRole(constants.users.enumTypes.ADMIN)],
    handler: users.createAdminUser,
  },
  {
    method: 'POST',
    url: '/',
    schema: {
      body: usersValidators.createOne.body,
    },
    handler: users.createUser,
  },
  {
    method: 'GET',
    url: '/:id',
    schema: {
      params: usersValidators.findOne.params,
    },
    preValidation: [auth.isAuthenticated],
    handler: users.findOneUser,
  },
  {
    method: 'PUT',
    url: '/:id',
    schema: {
      params: usersValidators.updateOne.params,
      body: usersValidators.updateOne.body,
    },
    preValidation: [auth.isAuthenticated],
    handler: users.updateOneUser,
  },
]
