const mongoose = require('mongoose')


const priceSchema = new mongoose.Schema(
    {
        currency: {
            type: String,
            default: "INR",
        },
        currentPrice: Number,

    }, { timestamps: true })

module.exports = mongoose.model('currentPrice', priceSchema)