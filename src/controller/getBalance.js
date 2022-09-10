const transactionModel = require('../models/transactionModel')
const priceModel = require('../models/priceModel')

const getBalance = async (req, res) => {
    let address = req.body.address;

    let findAddress = await transactionModel.findOne({ address: address })

    let transaction = findAddress.transactionData

    let totalEther = 0

    for (let i = 0; i < transaction.length; i++) {
        let trans = transaction[i];

        if (trans.from == address) {
            totalEther = totalEther - parseInt(trans.value)
        }
        else if (trans.to == address) {
            totalEther = totalEther + parseInt(trans.value)
        }
    }

    let price = await priceModel.findOne({})

    let currentPrice = price.currentPrice

    res.status(200).send({ currentBalance: totalEther, currentPrice })
}

module.exports = { getBalance }