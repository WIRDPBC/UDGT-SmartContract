'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _wallet = require('./wallet.ctrl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//TO create KeyPair
router.post('/udgt/api/createKeyPair', _wallet.walletCtrl.checkUserExists, _wallet.walletCtrl.createKeyPair);

//TO get Balances for a KeyPair
router.post('/udgt/api/getBalances', _wallet.walletCtrl.getBalances);

//To get the Wallet Info
router.post('/udgt/api/getWalletInfo', _wallet.walletCtrl.getWalletInfo);

exports.default = router;