const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driver.controller");

router.get("/get", driverController.getDrivers);
router.get("/get/:id", driverController.getDriver);
router.post("/create", driverController.createDriver);
router.put("/update/:id", driverController.updateDriver);
router.delete("/delete/:id", driverController.deleteDriver);

module.exports = router;
