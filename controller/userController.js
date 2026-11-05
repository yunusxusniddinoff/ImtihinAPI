const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const {registerSchema, loginSchema} = require("../validations/userValids")
const transporter = require("../config/mail")
const generateToken = require("../utils/generateToken")


exports.registerUser = async (req, res) => {
    try {
        const validation = registerSchema.safeParse(req.body)

        if(!validation.success) {
            return res.status(400).send("Tekshiruvda hatolik topildi")
        }

        const {fullname, email, password, role} = req.body

        const existUser = await User.findOne({email})

        if(existUser) {
            return res.status(409).send("Bunday foydalanuvchi mavjud")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            fullname, email, password: hashedPassword, role
        })

        res.status(201).json({
            message: "Yangi foydalanuvchi qoshildi",
            user: newUser,
            message: "OTP kodingizni tasdiqlang"
        })


    } catch (error) {
        res.status(500).send(error)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const validation = loginSchema.safeParse(req.body)

        if(!validation.success) {
            return res.status(400).send("Tekshiruvda hatolik topildi")
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).send("Bunday foydalanuvchi mavjud emas")
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(401).send("Parol notogri")
        }

        const token = generateToken(user)

        res.json({
            message: "Login qilindi",
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const otpStore = {}

exports.sendOTP = async (req, res) => {
    try {
        const {email} = req.body

        if(!email) {
            return res.status(404).send("EMAIL yozishingiz kerak")
        }

        const otp = Math.floor(100000 + Math.random() * 900000)

        otpStore[email] = otp

        await transporter.sendMail({
            from: process.env.OTP_PROFILE,
            to: email,
            subject: "OTP code",
            text: `OTP kodingiz ${otp}`
        })

        res.json({
            message: "OTP jonatildi"
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        const {email, otp} = req.body


        if (!email || !otp) {
            return res.status(404).json({
                message: "Email and OTP required"
            })
        }

        if(otpStore[email] !== otp) {
           return res.status(400).json({
                message: "Invalid OTP"
            })
        }

        delete otpStore[email]

        const user = await User.findOneAndUpdate(
            {email},
            {isVerified: true},
            {new: true}
        )

        if(!user) {
            return res.status(404).json({
                message: "Bunday foydalanuvchi mavjud emas"
            })
        }

        const token = generateToken(user)

        return res.json({
            message: "OTP togri",
            user: user,
            token
        })

        res.status(400).json({
            message: "Invalid OTP"
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })
    }
}

exports.profile = async (req, res) => {
    try {
        const {fullname, role} = req.user

        res.json({
            message: `Assalomu alaykum ${fullname}, siz ${role} siz`
        })
    } catch (error) {
        console.log(error)

     res.status(500).json({
        message: error.message
        })
    }
}