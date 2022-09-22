
const express = require("express")
const route = express.Router();
const transaction = require("../controller/transaction");
const getEther = require('../controller/etherController')
const { getBalance } = require('../controller/balanceController')


route.get("/getTransaction/:address", transaction.getTransaction)
route.get("/getCurrentPrice", getEther.getEther)
route.get('/getBalance/:address', getBalance)


module.exports = route
