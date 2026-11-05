const Order = require("../models/orderModel")
const orderSchema = require("../validations/orderValids")

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("courier", "fullname email phone vehicle")

        res.json({
            message: orders
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOneOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("courier", "fullname email phone vehicle")
    
        if(!order) {
            return res.status(404).json({
                message: "Buyurtma topilmadi"
            })
        }
    
        res.send(order)

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}

exports.createOrder = async (req, res) => {
    try {
        const validation = orderSchema.safeParse(req.body)

        if(!validation.success) {
           return res.status(400).send("Tekshiruvda hatolik topildi")
        }

        const order = await Order.create(req.body)

        res.status(201).json({
            message: "Yangi buyurtma qoshildi",
            order
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}

exports.editorder = async (req, res) => {
    try {
        const validation = orderSchema.safeParse(req.body)

        if(!validation.success) {
           return res.status(400).send("Tekshiruvda hatolik topildi")
        }

        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
        
        if(!order) {
            return res.status(404).json({
                message: "Buyurtma topilmadi"
            })
        }

        res.send(order)

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
    
        if(!order) {
            return res.status(404).json({
                message: "Buyurtma topilmadi"
            })
        }
    
        res.json({
            message: `Buyurtma o'chirildi ${order}`
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}

exports.orderStats = async (req, res) => {
    try {
        const natija = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: {$sum: 1}
                }
            }
        ])

        res.json({
            message: natija
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}