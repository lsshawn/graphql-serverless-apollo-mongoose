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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! serverless-http */ "serverless-http");
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(serverless_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-playground-middleware-express */ "graphql-playground-middleware-express");
/* harmony import */ var graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_3__);




const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

mongoose.Promise = global.Promise;
let isConnected;


const Query = __webpack_require__(/*! ./resolvers/Query/index */ "./src/resolvers/Query/index.js");

const Mutation = __webpack_require__(/*! ./resolvers/Mutation/index */ "./src/resolvers/Mutation/index.js");

async function connectToDatabase() {
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  console.log('=> using new database connection');

  try {
    const db = await mongoose.connect(config.MONGDB_URI);
    isConnected = db.connections[0].readyState;
    console.log('Connected: ', isConnected);
    return db;
  } catch (err) {
    console.log('Mongoose connection error: ', +err);
  }

  return true;
} // ? doesn't work in production. Path incorrect in AWS readFileSync
// const fs = require('fs');
// const typeDefs = gql(fs.readFileSync("./src/schema.graphql", "utf8").toString())


const typeDefs = apollo_server_express__WEBPACK_IMPORTED_MODULE_3__["gql"]`
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
  Mutation // const app = express();

};
const server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_3__["ApolloServer"]({
  typeDefs,
  resolvers,
  path: "/graphql",
  context: request => {
    return { ...request
    };
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
}; // server.applyMiddleware({
//   app
// });
// app.get("/playground", graphiql({
//   endpoint: "/graphql"
// }));
// const handler = serverless(app);
// export {
//   handler
// };

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

const createTodo = async (_, {
  content
}, context, info) => {
  console.log('createTodo');

  try {
    const newTodo = {
      _id: new ObjectId(),
      content
    };
    console.log(Todo);
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

const Todo = __webpack_require__(/*! ../../db/models/Todo */ "./src/db/models/Todo.js");

const todos = async (parent, args, context, info) => {
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

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "graphql-playground-middleware-express":
/*!********************************************************!*\
  !*** external "graphql-playground-middleware-express" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-playground-middleware-express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "serverless-http":
/*!**********************************!*\
  !*** external "serverless-http" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serverless-http");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map