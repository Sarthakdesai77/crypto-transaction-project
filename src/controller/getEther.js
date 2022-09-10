const axios = require('axios')
const schedule = require('node-schedule')

const priceModel = require('../models/priceModel')

const getEther = async (req, res) => {
    let options = {
        method: "get",
        url: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    }

    let etherPrice = await axios(options);

    currPrice = await priceModel.create({ currentPrice: etherPrice.data.ethereum.inr })

    return res.status(200).send({ currPrice })
}

schedule.scheduleJob('*/10 * * * *', async () => {
    let options = {
        method: "get",
        url: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    }

    let etherPrice = await axios(options);

    currPrice = await priceModel.updateOne({}, { currentPrice: etherPrice.data.ethereum.inr }, { upsert: true })
})

module.exports.getEther = getEther