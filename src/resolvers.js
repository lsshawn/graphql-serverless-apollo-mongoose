'use strict';
const TodoMutation = require('./entities/todo/mutation');
const TodoQuery = require('./entities/todo/query');

exports.Mutation = {
  ...TodoMutation
}

exports.Query = {
  ...TodoQuery
};