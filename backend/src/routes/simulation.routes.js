const express = require("express");
const router = express.Router();
const simulationController = require("../controllers/simulation.controller");

router.post("/", simulationController.runSimulation);

module.exports = router;
