const { gql } = require('apollo-server-lambda')

const Todo = gql`
  type Todo {
    _id: ID!
      content: String
  }
`

module.exports = Todo