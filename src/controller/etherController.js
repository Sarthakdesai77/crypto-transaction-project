const axios = require('axios')
const schedule = require('node-schedule')

const priceModel = require('../models/priceModel')

const getEther = async (req, res) => {
    try {
        let options = {
            method: "get",
            url: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
        }

        let etherPrice = await axios(options);

        currentPrice = await priceModel.create({ currentPrice: etherPrice.data.ethereum.inr })

        return res.status(200).send({ status: true, message: 'successfully created', currentPrice })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

schedule.scheduleJob('*/10 * * * *', async () => {
    try {
        let options = {
            method: "get",
            url: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
        }

        let etherPrice = await axios(options);

        currPrice = await priceModel.updateOne({ currency: "INR" }, { currentPrice: etherPrice.data.ethereum.inr }, { upsert: true })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
})

module.exports.getEther = getEther