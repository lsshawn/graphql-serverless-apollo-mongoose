const mongoose = require('mongoose')
const Todo = require('./model')
const { ObjectId } = mongoose.Types
const { connectToDatabase } = require('../../utils')

const createTodo = async (_, { content }, context, info) => {
  await connectToDatabase()

  try {
    const newTodo = { _id: new ObjectId(), content }
    await (new Todo(newTodo)).save()
    return newTodo
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  createTodo
}