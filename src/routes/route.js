
const express = require("express")
const route = express.Router();
const transaction = require("../controller/transaction");
const getEther = require('../controller/etherController')
const { getBalance } = require('../controller/balanceController')


route.get("/getlog", transaction.getTransaction)
route.get("/getprice", getEther.getEther)
route.get('/getBalance', getBalance)


module.exports = route
