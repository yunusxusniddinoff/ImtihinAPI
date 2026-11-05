const express = require("express")
const connectDB = require("./config/db")
const app = express()
const userRouter = require("./routes/userRoutes")
const courierRouter = require("./routes/courierRoutes")
const orderRouter = require("./routes/orderRoutes")

connectDB()

app.use(express.json())

app.use("/api", userRouter)

app.use("/api", courierRouter)

app.use("/api", orderRouter)


app.listen(process.env.PORT, () => {console.log(`Server ${process.env.PORT} da ishlamoqda`)})