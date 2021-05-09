const { GraphQLError } = require('graphql')
const { ApiError } = require('../../../errors')

const isAuthenticated = (ctx) => {
  const { authError } = ctx
  if (authError) throw new GraphQLError(authError.message)
}

const isAuthenticatedAndObjectOwner = (ctx, id) => {
  const { user, authError } = ctx

  if (authError) throw new GraphQLError(authError.message)

  if (user.id !== id) {
    try {
      ApiError.throw(ApiError.types.FORBIDDEN)
    } catch (error) {
      throw new GraphQLError(authError.message)
    }
  }
}

const isAuthenticatedRole = async (ctx, ...roles) => {
  const { user, authError } = ctx

  if (authError) throw new GraphQLError(authError.message)

  if (!roles.includes(user.type)) {
    try {
      ApiError.throw(ApiError.types.FORBIDDEN)
    } catch (error) {
      throw new GraphQLError(authError.message)
    }
  }
}

module.exports = {
  isAuthenticated,
  isAuthenticatedAndObjectOwner,
  isAuthenticatedRole,
}
