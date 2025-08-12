const express = require("express");
const router = express.Router();
const simulationController = require("../controllers/simulation.controller");

router.post("/", simulationController.runSimulation);
router.get("/latest", simulationController.getLatestSimulation); // Endpoint to get latest simulation result

module.exports = router;
