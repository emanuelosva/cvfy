const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLScalarType,
} = require('graphql')

const VoidType = new GraphQLScalarType({
  name: 'Void',
  description: 'Represents NULL values',
  serialize: () => null,
  parseValue: () => null,
  parseLiteral: () => null,
})

const NonNullableIDType = new GraphQLNonNull(GraphQLID)

module.exports = {
  NonNullableIDType,
  VoidType,
}
