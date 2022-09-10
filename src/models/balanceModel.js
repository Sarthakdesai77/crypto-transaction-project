const mongoose = require('mongoose')

const balanceSchema = new mongoose.Schema(
    {
        address: String,
        currentBalance: Number,
        currentPrice: Number,

    }, { timestamps: true })

module.exports = mongoose.model('balance', balanceSchema)