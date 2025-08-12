const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.get("/get", orderController.getOrders);
router.get("/get/:id", orderController.getOrder);
router.post("/create", orderController.createOrder);
router.put("/update/:id", orderController.updateOrder);
router.delete("/delete/:id", orderController.deleteOrder);

module.exports = router;
