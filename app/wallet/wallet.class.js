"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var walletClass = function walletClass(request) {
    _classCallCheck(this, walletClass);

    this.emailId = request.emailId;
    this.keyPair = request.keyPair;
    this.responseJson = request.responseJson;
    this.publicKey = request.publicKey;
};

exports.default = walletClass;