const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require('../middlewares/roleMiddleware')
const orderController = require("../controller/orderController")

router.get("/order", authMiddleware, orderController.getOrders)

router.post("/order", authMiddleware, roleMiddleware("admin", "manager"), orderController.createOrder)

router.get("/order/stats", authMiddleware, roleMiddleware("admin", "manager"), orderController.orderStats)

router.put("/order/:id", authMiddleware, roleMiddleware("admin", "manager"), orderController.editorder)

router.delete("/order/:id", authMiddleware, roleMiddleware("admin"), orderController.deleteOrder)

router.get("/order/:id", authMiddleware, orderController.getOneOrder)


module.exports = router

