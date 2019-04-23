'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = _mongoose2.default.Schema;

var transactionsSchema = new schema({
    sourceId: {
        type: String
    },
    destinationId: {
        type: String
    },
    assetType: {
        type: String
    },
    memoText: {
        type: String
    },
    amount: {
        type: String
    },
    transactionResult: {
        type: Object
    }
});

exports.default = _mongoose2.default.model('Transactions', transactionsSchema);