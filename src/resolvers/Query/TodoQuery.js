const Todo = require('../../db/models/Todo')

const todos = async (parent, args, context, info) => {
  try {
    const list = Todo.find()
    return list
  } catch (err) {
    throw new Error(err)
  }
}

function hello() {
  return "world"
}

module.exports = {
  todos,
  hello
}