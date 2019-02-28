const { ApolloServer, gql } = require("apollo-server-lambda")
const Query = require('./resolvers/Query/index')
const Mutation = require('./resolvers/Mutation/index')

// ? doesn't work in production. Path incorrect in AWS readFileSync
// const fs = require('fs');
// const typeDefs = gql(fs.readFileSync("./src/schema.graphql", "utf8").toString())
const typeDefs = gql`
  type Query {
    hello: String
    todos: [Todo!] !
  }

  type Mutation {
    createTodo(content: String!): Todo!
  }

  type Todo {
    _id: ID!
    content: String
  }
`

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

