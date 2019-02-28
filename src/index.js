import express from "express";
import serverless from "serverless-http";
import graphiql from "graphql-playground-middleware-express";
import {
  ApolloServer,
  gql
} from "apollo-server-express";
import { prisma } from './generated/prisma-client'
const Link = require('./resolvers/Link')

const fs = require('fs');
const typeDefs = gql(fs.readFileSync("./src/schema.graphql", "utf8").toString())


const resolvers = {
  Query: {
    hello: () => "world"
  },
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
