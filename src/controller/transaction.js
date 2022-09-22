const axios = require('axios');
const transactionModel = require('../models/transactionModel')
const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/b90c3e216f534aa59b0b7b5f347cded7')

const getTransaction = async (req, res) => {

    try {
        let address = req.params.address;
        if (!address) res.status(400).send({ status: false, message: 'Please provide the address' });
        if (!web3.utils.isAddress(address)) return res.status(400).send({ status: false, message: 'please enter valid address' })

        let checkAddress = await transactionModel.findOne({ address: address });
        if (checkAddress) {
            return res.status(200).send({ status: true, message: 'transaction details', address: checkAddress.address, transaction: checkAddress.transactionData });
            
        } else {
            let apiKey = process.env.API_KEY
            let options = {
                method: "get",
                url: `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`
            };

            let ans = await axios(options);
            let transaction = ans.data.result;

            await transactionModel.create({ address: address, transactionData: transaction });

            res.status(201).send({ status: true, message: 'transaction details', address: address, transaction: transaction });
        }

    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}

module.exports.getTransaction = getTransaction