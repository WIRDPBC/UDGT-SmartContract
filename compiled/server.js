"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.app = void 0;var _development = require("./config/env/development");
var _express = _interopRequireDefault(require("./config/express"));
var _mongoose = _interopRequireDefault(require("./config/mongoose"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var app = (0, _express.default)();exports.app = app;
var db = (0, _mongoose.default)();

global.appRoot = require('path').resolve(__dirname);
console.log(appRoot);

app.listen(_development.dbConfig.port, function () {
  console.log("Server listening to port:", _development.dbConfig.port);
});