const express = require("express");
const router = express.Router();
const routeController = require("../controllers/route.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/get",authMiddleware, routeController.getRoutes);
router.get("/get/:id",authMiddleware, routeController.getRoute);
router.post("/create",authMiddleware, routeController.createRoute);
router.put("/update/:id",authMiddleware, routeController.updateRoute);
router.delete("/delete/:id",authMiddleware, routeController.deleteRoute);

module.exports = router;
