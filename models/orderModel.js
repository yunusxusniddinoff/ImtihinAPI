const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "on the way", "delivered", "cancelled"],
        default: "pending"
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    courier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courier"
    }
})

module.exports = mongoose.model("Order", orderSchema)