'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transactionsCtrl = undefined;

var _transactions = require('./transactions.class');

var _transactions2 = _interopRequireDefault(_transactions);

var _transactions3 = require('./transactions.model');

var _transactions4 = _interopRequireDefault(_transactions3);

var _development = require('../../config/env/development');

var _stellarSdk = require('stellar-sdk');

var StellarSdk = _interopRequireWildcard(_stellarSdk);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transactionsCtrl = {};

transactionsCtrl.buildTransaction = async function (req, res) {
    console.log("keypair:", req.body.keyPair);
    var transactionReq = new _transactions2.default(req.body);
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server(_development.stellarSdkInfo.server);
    var sourceKeys = StellarSdk.Keypair.fromSecret(req.body.keyPair.secret);
    var destinationId = transactionReq.destinationId;
    // Transaction will hold a built transaction we can resubmit if the result is unknown.
    var transaction = void 0;
    try {
        server.loadAccount(destinationId)
        // If the account is not found, surface a nicer error message for logging.
        .catch(StellarSdk.NotFoundError, function (error) {
            //throw new Error('The destination account does not exist!');
            res.json({
                status: 400,
                message: "The destination account does not exist!"
            });
        })
        // If there was no error, load up-to-date information on your account.
        .then(function () {
            return server.loadAccount(sourceKeys.publicKey());
        }).then(function (sourceAccount) {
            // Start building the transaction.
            console.log("SOURCE ACCOUNT:", sourceAccount);
            transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
                memo: transactionReq.memoText,
                fee: StellarSdk.BASE_FEE
            }).addOperation(StellarSdk.Operation.payment({
                destination: destinationId,
                asset: StellarSdk.Asset.native(),
                amount: transactionReq.amount,
                fee: transactionReq.fee
            }))
            //.addMemo(StellarSdk.Memo.text(transactionReq.memoText))
            .setTimeout(1000).build();
            transaction.sign(sourceKeys);
            return server.submitTransaction(transaction);
        }).then(function (result) {
            console.log('Success! Results:', result);
            req.body.txnresponse = result;
            saveTransaction(req, res);
        }).catch(function (error) {
            console.error('Something went wrong!', error);
            res.json({
                status: 400,
                message: "Error occured",
                error: error.message
            });
        });
    } catch (err) {
        res.json({
            status: 400,
            message: "Error occured",
            error: err.message
        });
    }
};

transactionsCtrl.gameTransaction = async function (req, res) {
    // console.log("keypair:", req.body.keyPair)
    var request = new _transactions2.default(req.body);
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server(_development.stellarSdkInfo.server);
    var sourceKeys = StellarSdk.Keypair.fromSecret(req.body.keyPair.secret);
    var destinationId = request.destinationId;
    var transaction = void 0;
    try {
        server.loadAccount(destinationId).catch(StellarSdk.NotFoundError, function (error) {
            res.json({
                status: 400,
                message: "The destination account does not exist!"
            });
        }).then(function () {
            return server.loadAccount(sourceKeys.publicKey());
        }).then(function (sourceAccount) {
            console.log(sourceAccount);
            if (request.amount > 10) {
                res.json({
                    status: 400,
                    message: "We cannot transfer more than one token.",
                    error: err.message
                });
            } else {
                transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
                    memo: request.memoText,
                    fee: StellarSdk.BASE_FEE
                }).addOperation(StellarSdk.Operation.payment({
                    destination: destinationId,
                    asset: StellarSdk.Asset.native(),
                    amount: request.amount
                }))
                //.addMemo(StellarSdk.Memo.text(request.memoText))
                .setTimeout(1000).build();
                transaction.sign(sourceKeys);
                return server.submitTransaction(transaction);
            }
        }).then(function (result) {
            console.log('Success! Results:', result);
            req.body.txnresponse = result;
            saveTransaction(req, res, 'Congratulations!! you won!!');
        }).catch(function (error) {
            console.error('Something went wrong!', error);
            res.json({
                status: 400,
                message: "Error occured",
                error: error.message
            });
        });
    } catch (err) {
        res.json({
            status: 400,
            message: "Error occured",
            error: err.message
        });
    }
};
var saveTransaction = async function saveTransaction(req, res, message) {
    var txn = new _transactions2.default(req.body);
    try {
        txn.sourceId = req.body.keyPair.publicKey;
        txn.transactionResult = req.body.txnresponse;
        var transaction = new _transactions4.default(txn);
        var result = await transaction.save();
        if (result) {
            res.json({
                status: 200,
                message: message ? message : 'Transaction Completed',
                data: result
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

exports.transactionsCtrl = transactionsCtrl;