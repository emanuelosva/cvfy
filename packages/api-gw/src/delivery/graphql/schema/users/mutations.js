const { userService } = require('@cvfy/users-module')
const { UserType, UserUpdateInputType } = require('./types')
const { NonNullableIDType } = require('../../commonTypes')
const { Auth } = require('../../middleware')

module.exports = {
  UpdateUser: {
    type: UserType,
    args: {
      id: { type: NonNullableIDType },
      data: { type: UserUpdateInputType },
    },
    resolve: async (_, { id, data }, ctx) => {
      Auth.isAuthenticatedAndObjectOwner(ctx, id)
      const user = await userService.updateOne(id, data)
      return user
    },
  },
}
