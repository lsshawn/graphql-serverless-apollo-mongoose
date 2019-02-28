'use strict';

import express from "express";
import serverless from "serverless-http";
import graphiql from "graphql-playground-middleware-express";

const { ApolloServer, gql } = require('apollo-server-lambda')
const { postTypeDef, postResolvers } = require('./models/post')

const typeDefs = gql`${postTypeDef}`
const resolvers = postResolvers

const schema = require('./schema')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({
    event,
    context
  }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  })
})

exports.graphql = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})

exports.graphiql = server.graphiqlLambda({
  endpointURL: 'prod/graphql'
})

exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go serverless',
      input: event
    })
  }

  callback(null, response)
}
