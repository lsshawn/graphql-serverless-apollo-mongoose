import express from "express";
import serverless from "serverless-http";
import graphiql from "graphql-playground-middleware-express";
import {
  ApolloServer,
  gql
} from "apollo-server-express";
import { prisma } from './generated/prisma-client'
const Query = require('./resolvers/Query')
const Link = require('./resolvers/Link')

// ? doesn't work in production. Path incorrect in AWS readFileSync
// const fs = require('fs');
// const typeDefs = gql(fs.readFileSync("./src/schema.graphql", "utf8").toString())

const typeDefs = gql`
  type Query {
    hello: String
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
  }
`

const resolvers = {
  Query,
  Link
}

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  path: "/graphql",
  context: request => {
    return {
      ...request,
      prisma
    }
  }
});

server.applyMiddleware({
  app
});

app.get("/playground", graphiql({
  endpoint: "/graphql"
}));

const handler = serverless(app);

export {
  handler
};
