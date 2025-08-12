const express = require("express");
const router = express.Router();
const routeController = require("../controllers/route.controller");

router.get("/get", routeController.getRoutes);
router.get("/get/:id", routeController.getRoute);
router.post("/create", routeController.createRoute);
router.put("/update/:id", routeController.updateRoute);
router.delete("/delete/:id", routeController.deleteRoute);

module.exports = router;
