'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _wallet = require('../app/wallet/wallet.routes');

var _wallet2 = _interopRequireDefault(_wallet);

var _transactions = require('../app/transactions/transactions.routes');

var _transactions2 = _interopRequireDefault(_transactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var app = (0, _express2.default)();
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use("/", _wallet2.default);
    app.use("/", _transactions2.default);

    return app;
};