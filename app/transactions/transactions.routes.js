'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _transactions = require('./transactions.ctrl');

var _wallet = require('../wallet/wallet.ctrl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//To perform transaction
router.post('/udgt/api/buildTransaction', _wallet.walletCtrl.getWalletInfo, _transactions.transactionsCtrl.buildTransaction);

router.post('/udgt/api/handleGame', _wallet.walletCtrl.getWalletInfo, _transactions.transactionsCtrl.gameTransaction);

exports.default = router;