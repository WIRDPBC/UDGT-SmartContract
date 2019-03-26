import express from 'express';
import {transactionsCtrl} from './transactions.ctrl';
import {walletCtrl} from '../wallet/wallet.ctrl';
let router = express.Router();


//To perform transaction
router.post('/udgt/api/buildTransaction',
walletCtrl.getWalletInfo,
transactionsCtrl.buildTransaction);

router.post('/udgt/api/handleGame',
walletCtrl.getWalletInfo,
transactionsCtrl.gameTransaction);


export default router;



