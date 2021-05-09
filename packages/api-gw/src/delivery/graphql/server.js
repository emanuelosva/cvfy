const { ApolloServer } = require('apollo-server-fastify')
const { schema } = require('./schema')
const { createContext } = require('./context')
const config = require('../../config')

const server = new ApolloServer({
  schema,
  context: createContext,
  playground: !config.IS_PRODUCTION,
  introspection: true,
})

module.exports = server
