const bcrypt = require("bcrypt")
const courierSchema = require("../validations/courierValids")
const transporter = require("../config/mail")
const generateToken = require("../utils/generateToken")
const Courier = require("../models/courierModel")

exports.getCouriers = async (req, res) => {
    try {
        const couriers = await Courier.find()

        res.json(
            couriers)
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}

exports.createCourier = async (req, res) => {
    try {
        const validation = courierSchema.safeParse(req.body)

        if(!validation.success) {
           return res.status(400).send("Tekshiruvda hatolik topildi")
        }

        const courier = await Courier.create(req.body)

        res.status(201).json({
            message: "Yangi kuryer qoshildi",
            courier
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}

exports.editCourier = async (req, res) => {
    try {
        const validation = courierSchema.safeParse(req.body)

        if(!validation.success) {
           return res.status(400).send("Tekshiruvda hatolik topildi")
        }

        const courier = await Courier.findByIdAndUpdate(req.params.id, req.body, {new: true})
        
        if(!courier) {
            return res.status(404).json({
                message: "Kuryer topilmadi"
            })
        }

        res.send(courier)

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteCourier = async (req, res) => {
    try {
        const courier = await Courier.findByIdAndDelete(req.params.id)
    
        if(!courier) {
            return res.status(404).json({
                message: "Kuryer topilmadi"
            })
        }
    
        res.json({
            message: `Kuryer o'chirildi ${courier}`
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}