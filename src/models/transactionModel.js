let mongoose = require('mongoose')

let transactionSchema = new mongoose.Schema(
    {
        address: String,
        transactionData: [Object]

    }, { timestamps: true })

module.exports = mongoose.model("transaction", transactionSchema)