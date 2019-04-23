'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.walletCtrl = undefined;

var _wallet = require('./wallet.model');

var _wallet2 = _interopRequireDefault(_wallet);

var _wallet3 = require('./wallet.class');

var _wallet4 = _interopRequireDefault(_wallet3);

var _development = require('../../config/env/development');

var _stellarSdk = require('stellar-sdk');

var StellarSdk = _interopRequireWildcard(_stellarSdk);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var walletCtrl = {};

walletCtrl.checkUserExists = async function (req, res, next) {
    var user = new _wallet4.default(req.body);
    try {
        var result = await _wallet2.default.findOne({ emailId: user.emailId }).exec();
        if (result) {
            res.json({
                status: 205,
                message: "Wallet exists for this user"
            });
        } else {
            next();
        }
    } catch (e) {
        res.json({
            status: 400,
            message: "Error occured",
            error: e.message
        });
    }
};

walletCtrl.createKeyPair = async function (req, res) {
    var walletAcc = new _wallet4.default(req.body);
    if (walletAcc.emailId) {
        try {
            var pair = StellarSdk.Keypair.random();
            var response = await (0, _nodeFetch2.default)('https://friendbot.stellar.org?addr=' + encodeURIComponent(pair.publicKey()));
            var responseJson = await response.json();
            console.log("SUCCESS! You have a new account :)\n", responseJson);
            walletAcc.keyPair = {
                publicKey: pair.publicKey(),
                secret: pair.secret()
            };
            walletAcc.responseJson = responseJson;
            var walletAccount = new _wallet2.default(walletAcc);
            var result = await walletAccount.save();
            console.log(result);
            if (result) {
                res.json({
                    status: 200,
                    message: "Wallet created",
                    data: {
                        emailId: result.emailId,
                        publicKey: result.keyPair.publicKey
                    }
                });
            }
        } catch (e) {
            console.error("ERROR!", e);
            res.json({
                status: 400,
                message: "Error occured",
                error: e.message
            });
        }
    } else {
        res.json({
            status: 400,
            message: "Please enter email"
        });
    }
};

walletCtrl.getBalances = async function (req, res) {
    var walletAcc = new _wallet4.default(req.body);
    try {
        var server = new StellarSdk.Server(_development.stellarSdkInfo.server);
        var account = await server.loadAccount(walletAcc.publicKey);
        console.log("Balances for account: " + walletAcc.publicKey);
        account.balances.forEach(function (balance) {
            console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
        });
        res.json({
            status: 200,
            message: "success",
            data: account.balances
        });
    } catch (err) {
        res.json({
            status: 400,
            message: "Error occured",
            error: err.message
        });
    }
};

walletCtrl.getWalletInfo = async function (req, res, next) {
    var walletAcc = new _wallet4.default(req.body);
    try {
        var result = await _wallet2.default.findOne({ emailId: walletAcc.emailId }).exec();
        console.log(result);
        if (result) {
            if (req.url == '/udgt/api/getWalletInfo') {
                res.json({
                    status: 200,
                    message: "success",
                    data: result
                });
            } else {
                req.body.keyPair = result.keyPair;
                next();
            }
        } else {
            res.json({
                status: 404,
                message: "User not found"
            });
        }
    } catch (err) {
        res.json({
            status: 400,
            message: "Error occured",
            error: err.message
        });
    }
};

exports.walletCtrl = walletCtrl;