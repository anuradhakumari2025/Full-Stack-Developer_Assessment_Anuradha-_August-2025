const express = require("express");
const router = express.Router();
const simulationController = require("../controllers/simulation.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, simulationController.runSimulation);
router.get("/latest", authMiddleware, simulationController.getLatestSimulation); // Endpoint to get latest simulation result

module.exports = router;
