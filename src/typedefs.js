const Todo = require('./entities/todo/typeDef.js')
const { gql } = require('apollo-server-lambda')

const Query = gql`
  type Query {
    hello: String
    todos: [Todo!] !
}
`

const Mutation = gql`
  type Mutation {
    createTodo(content: String!): Todo!
}
`

const schemaArray = [ Todo, Query, Mutation ]

module.exports = schemaArray