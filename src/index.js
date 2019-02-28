import express from "express";
import serverless from "serverless-http";
import graphiql from "graphql-playground-middleware-express";
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let isConnected

import {
  ApolloServer,
  gql
} from "apollo-server-express";
const Query = require('./resolvers/Query/index')
const Mutation = require('./resolvers/Mutation/index')

async function connectToDatabase() {
  if (isConnected) {
    console.log('=> using existing database connection')
    return
  }

  console.log('=> using new database connection')

  try {
    const db = await mongoose.connect(config.MONGDB_URI)
    isConnected = db.connections[0].readyState
    console.log('Connected: ', isConnected)
    return db
  } catch (err) {
    console.log('Mongoose connection error: ', + err)
  }
  return true
}

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

// const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  path: "/graphql",
  context: request => {
    return {
      ...request
    }
  }
});

exports.playground = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDatabase();
  return server.playgroundHandler(event, context, callback);
};
exports.server = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDatabase();
  return server.graphqlHandler(event, context, callback);
};


// server.applyMiddleware({
//   app
// });

// app.get("/playground", graphiql({
//   endpoint: "/graphql"
// }));

// const handler = serverless(app);

// export {
//   handler
// };
