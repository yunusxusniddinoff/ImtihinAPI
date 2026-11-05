const mongoose = require("mongoose")

const courierSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Courier", courierSchema)