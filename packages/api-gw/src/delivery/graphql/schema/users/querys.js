const { userService } = require('@cvfy/users-module')
const { UserType } = require('./types')
const { NonNullableIDType } = require('../../commonTypes')
const { Auth } = require('../../middleware')

module.exports = {
  GetUserById: {
    type: UserType,
    args: {
      id: { type: NonNullableIDType },
    },
    resolve: async (_, { id }, ctx) => {
      Auth.isAuthenticatedAndObjectOwner(ctx, id)
      const user = await userService.findById(id)
      return user
    },
  },
}
