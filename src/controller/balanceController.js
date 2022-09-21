const transactionModel = require('../models/transactionModel')
const priceModel = require('../models/priceModel')
const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/b90c3e216f534aa59b0b7b5f347cded7')

const getBalance = async (req, res) => {
    try {
        let address = req.body.address;

        let findAddress = await transactionModel.findOne({ address: address })
        if (!findAddress) return res.status(404).send({ status: false, message: 'the address entered is invalid' })

        let transaction = findAddress.transactionData

        let totalEther = 0

        for (let i = 0; i < transaction.length; i++) {
            let trans = transaction[i];

            if (trans.from == address) {
                totalEther = totalEther - parseInt(trans.value);
            }
            else if (trans.to == address) {
                totalEther = totalEther + parseInt(trans.value);
            }
        }

        let price = await priceModel.findOne({ currency: 'INR' });

        let currentPrice = price.currentPrice;

        totalEther = totalEther.toString();
        totalEther = parseFloat(web3.utils.fromWei(totalEther, 'ether'));

        res.status(200).send({ status: true, message: 'wallet details', currentBalance: totalEther, currentPrice });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { getBalance }