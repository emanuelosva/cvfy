const { profilesService } = require('@cvfy/profile-module')
const { GraphQLString } = require('graphql')
const { ProfileType } = require('./types')
const { NonNullableIDType } = require('../../commonTypes')
const { Auth } = require('../../middleware')

module.exports = {
  GetProfileById: {
    type: ProfileType,
    args: {
      id: { type: NonNullableIDType },
    },
    resolve: async (_, { id }, ctx) => {
      const profile = await profilesService.findById(id)
      Auth.isAuthenticatedAndObjectOwner(ctx, profile.owner)
      return profile
    },
  },
  GetProfileBySlug: {
    type: ProfileType,
    args: {
      slug: { type: GraphQLString },
    },
    resolve: async (_, { slug }) => {
      const profile = await profilesService.findBySlug(slug)
      return profile
    },
  },
}
