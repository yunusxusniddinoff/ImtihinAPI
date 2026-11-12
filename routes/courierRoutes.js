const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require('../middlewares/roleMiddleware')
const courierController = require("../controller/courierController")

router.get("/courier", courierController.getCouriers)

router.post("/courier", authMiddleware, roleMiddleware("admin"), courierController.createCourier)

router.put("/courier/:id", authMiddleware, roleMiddleware("admin"), courierController.editCourier)

router.delete("/courier/:id", authMiddleware, roleMiddleware("admin"), courierController.deleteCourier)


module.exports = router
