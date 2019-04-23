"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var port = process.env.PORT || 3001;
var dbConfig = exports.dbConfig = {
    port: port,
    secret: "UDGT",
    //db:"mongodb://localhost:27017/StellarWallet"
    db: "mongodb://udgt:udgt123@ds163905.mlab.com:63905/udgt"
};

var stellarSdkInfo = exports.stellarSdkInfo = {
    server: "https://horizon-testnet.stellar.org"
};