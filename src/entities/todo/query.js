const mongoose = require('mongoose')
const Todo = require('./model')
const { connectToDatabase } = require('../../utils')

const todos = async (parent, args, context, info) => {
  await connectToDatabase()

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