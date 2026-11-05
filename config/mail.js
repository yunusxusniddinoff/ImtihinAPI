const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.OTP_PROFILE,
        pass: process.env.APP_PASSWORD
    }
})

module.exports = transporter