const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driver.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/get",authMiddleware, driverController.getDrivers);
router.get("/get/:id",authMiddleware, driverController.getDriver);
router.post("/create",authMiddleware, driverController.createDriver);
router.put("/update/:id",authMiddleware, driverController.updateDriver);
router.delete("/delete/:id",authMiddleware, driverController.deleteDriver);

module.exports = router;
