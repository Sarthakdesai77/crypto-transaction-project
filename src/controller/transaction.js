const axios = require('axios')
const transactionSchema = require('../models/transactionModel')

const getTransaction = async (req, res) => {

    let address = req.body.address
    let apiKey = process.env.API_KEY
    let options = {
        method: "get",
        url: `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`
    };

    let ans = await axios(options);
    let a = ans.data.result

    await transactionSchema.create({ address: address, transactionData: a })

    res.send({ address: address, transaction: a })
}

module.exports.getTransaction = getTransaction