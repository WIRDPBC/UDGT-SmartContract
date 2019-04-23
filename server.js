'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.app = undefined;

var _development = require('./config/env/development');

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('./config/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var db = (0, _mongoose2.default)();

global.appRoot = require('path').resolve(__dirname);
console.log(appRoot);

app.listen(_development.dbConfig.port, function () {
    console.log("Server listening to port:", _development.dbConfig.port);
});

exports.app = app;