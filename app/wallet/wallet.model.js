'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = _mongoose2.default.Schema;

var walletAccountSchema = new schema({
    emailId: {
        type: String,
        required: true,
        unique: true,
        match: /\S+@\S+\.\S+/
    },
    keyPair: {
        secret: {
            type: String
        },
        publicKey: {
            type: String
        }
    },
    responseJson: {
        type: Object
    }
});
exports.default = _mongoose2.default.model('Wallet', walletAccountSchema);