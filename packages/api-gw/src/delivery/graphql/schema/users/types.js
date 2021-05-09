const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')

/**
 * User type
 */
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Cvfy user',
  fields: {
    id: { type: GraphQLID, description: 'User id' },
    email: { type: GraphQLString, description: 'User email' },
    name: { type: GraphQLString, description: 'User full name' },
    createdAt: { type: GraphQLString, description: 'Rcord creation date' },
    updatedAt: { type: GraphQLString, description: 'Last update date' },
  },
})

const UserCreateInputType = new GraphQLNonNull(new GraphQLInputObjectType({
  name: 'UserCreateInput',
  description: 'Data needed to create a new user',
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString), description: 'User email' },
    name: { type: new GraphQLNonNull(GraphQLString), description: 'User full name' },
    password: { type: new GraphQLNonNull(GraphQLString), description: 'User password' },
  },
}))

const UserUpdateInputType = new GraphQLNonNull(new GraphQLInputObjectType({
  name: 'UserUpdateInput',
  description: 'Data to update a user',
  fields: {
    email: { type: GraphQLString, description: 'User email' },
    name: { type: GraphQLString, description: 'User full name' },
  },
}))

module.exports = {
  UserType,
  UserCreateInputType,
  UserUpdateInputType,
}
