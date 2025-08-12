const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/get",authMiddleware, orderController.getOrders);
router.get("/get/:id", authMiddleware,orderController.getOrder);
router.post("/create",authMiddleware, orderController.createOrder);
router.put("/update/:id",authMiddleware, orderController.updateOrder);
router.delete("/delete/:id",authMiddleware, orderController.deleteOrder);

module.exports = router;
