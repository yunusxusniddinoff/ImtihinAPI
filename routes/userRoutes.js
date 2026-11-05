const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/register", userController.registerUser)

router.post("/login", userController.loginUser)

router.post("/sending-otp", userController.sendOTP)

router.post("/verifying-otp", userController.verifyOTP)

router.get("/profile", authMiddleware, userController.profile)

module.exports = router