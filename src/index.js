const { ApolloServer, gql } = require("apollo-server-lambda")
const Query = require('./resolvers/Query/index')
const Mutation = require('./resolvers/Mutation/index')
const { importSchema } = require('graphql-import')

const schema = importSchema('src/schema.graphql')
const typeDefs = gql`${schema}`

const resolvers = {
  Query,
  Mutation
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: event.functionName,
    event,
    context
  }),
  playground: {
    endpoint: process.env.ENDPOINT
  }
})

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    methods: 'POST',
    allowHeaders: ['Content-Type', 'Origin', 'Accept']
  },
});

