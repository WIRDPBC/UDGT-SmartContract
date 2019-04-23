'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _development = require('./env/development');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function () {
    await _mongoose2.default.connect(_development.dbConfig.db, { useNewUrlParser: true }, function (err, conn) {
        if (err) {
            console.log("Error in DB connection:", err.message);
        } else {
            console.log("Connected to DB");
        }
    });
    var db = _mongoose2.default.Connection;
    return db;
};