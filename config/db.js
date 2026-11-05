require("dotenv").config()

const mongoose = require("mongoose")

async function connectDB() {
    try {
        
        await mongoose.connect(process.env.DB_URL)
        console.log("Baza muvaffaqiyatli ulandi")
        
    } catch (error) {
        console.log("Baza ulanmadi: " + error.message)
        process.exit(1)
    }
}

module.exports = connectDB
