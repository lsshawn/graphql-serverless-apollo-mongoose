module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/db/models/Todo.js":
/*!*******************************!*\
  !*** ./src/db/models/Todo.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const TodoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  }
});
const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  ApolloServer,
  gql
} = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");

const Query = __webpack_require__(/*! ./resolvers/Query/index */ "./src/resolvers/Query/index.js");

const Mutation = __webpack_require__(/*! ./resolvers/Mutation/index */ "./src/resolvers/Mutation/index.js"); // ? doesn't work in production. Path incorrect in AWS readFileSync
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
`;
const resolvers = {
  Query,
  Mutation
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({
    event,
    context
  }) => ({
    headers: event.headers,
    functionName: event.functionName,
    event,
    context
  }),
  playground: {
    endpoint: process.env.ENDPOINT
  }
});
exports.handler = server.createHandler({
  cors: {
    origin: '*',
    methods: 'POST',
    allowHeaders: ['Content-Type', 'Origin', 'Accept']
  }
});

/***/ }),

/***/ "./src/resolvers/Mutation/TodoMutation.js":
/*!************************************************!*\
  !*** ./src/resolvers/Mutation/TodoMutation.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const Todo = __webpack_require__(/*! ../../db/models/Todo */ "./src/db/models/Todo.js");

const {
  ObjectId
} = mongoose.Types;

const {
  connectToDatabase
} = __webpack_require__(/*! ../../utils */ "./src/utils.js");

const createTodo = async (_, {
  content
}, context, info) => {
  await connectToDatabase();

  try {
    const newTodo = {
      _id: new ObjectId(),
      content
    };
    await new Todo(newTodo).save();
    return newTodo;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createTodo
};

/***/ }),

/***/ "./src/resolvers/Mutation/index.js":
/*!*****************************************!*\
  !*** ./src/resolvers/Mutation/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const TodoMutation = __webpack_require__(/*! ./TodoMutation */ "./src/resolvers/Mutation/TodoMutation.js");

module.exports = { ...TodoMutation
};

/***/ }),

/***/ "./src/resolvers/Query/TodoQuery.js":
/*!******************************************!*\
  !*** ./src/resolvers/Query/TodoQuery.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const Todo = __webpack_require__(/*! ../../db/models/Todo */ "./src/db/models/Todo.js");

const {
  ObjectId
} = mongoose.Types;

const {
  connectToDatabase
} = __webpack_require__(/*! ../../utils */ "./src/utils.js");

const todos = async (parent, args, context, info) => {
  await connectToDatabase();

  try {
    const list = Todo.find();
    return list;
  } catch (err) {
    throw new Error(err);
  }
};

function hello() {
  return "world";
}

module.exports = {
  todos,
  hello
};

/***/ }),

/***/ "./src/resolvers/Query/index.js":
/*!**************************************!*\
  !*** ./src/resolvers/Query/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const TodoQuery = __webpack_require__(/*! ./TodoQuery */ "./src/resolvers/Query/TodoQuery.js");

module.exports = { ...TodoQuery
};

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

mongoose.Promise = global.Promise;
let isConnected;

exports.connectToDatabase = async () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  console.log('=> using new database connection');

  try {
    let db = await mongoose.connect(process.env.DB);
    isConnected = db.connections[0].readyState;
    console.log('Connected: ', isConnected);
    return db;
  } catch (err) {
    console.log(err);
    throw new Error('Error in connecting to MongoDB: ', err);
  }
};

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map