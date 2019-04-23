"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transactions = function transactions(request) {
    _classCallCheck(this, transactions);

    this.sourceId = request.sourceId;
    this.destinationId = request.destinationId;
    this.assetType = request.assetType;
    this.memoText = request.memoText;
    this.amount = request.amount;
    this.transactionResult = request.transactionResult;
};

exports.default = transactions;