const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const UserSchema = require('./users')
const ProfileSchema = require('./profiles')

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...UserSchema.UserQuerys,
    ...ProfileSchema.ProfileQuerys,
  },
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...UserSchema.UserMutations,
    ...ProfileSchema.ProfileMutations,
  },
})

module.exports = {
  schema: new GraphQLSchema({ query: queryType, mutation: mutationType }),
}
