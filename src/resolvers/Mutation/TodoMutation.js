const mongoose = require('mongoose')
const Todo = require('../../db/models/Todo')
const { ObjectId } = mongoose.Types

const createTodo = async (_, { content }, context, info) => {
  console.log('createTodo')
  try {
    const newTodo = { _id: new ObjectId(), content }
    console.log(Todo)
    await (new Todo(newTodo)).save()
    return newTodo
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  createTodo
}