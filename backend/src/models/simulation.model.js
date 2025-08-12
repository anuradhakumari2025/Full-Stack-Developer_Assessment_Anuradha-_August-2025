const mongoose = require("mongoose");

const simulationSchema = new mongoose.Schema({
  availableDrivers: Number,
  startTime: String, // HH:MM
  maxHoursPerDriver: Number,
  totalProfit: Number,
  efficiencyScore: Number,
  onTimeDeliveries: Number,
  lateDeliveries: Number,
  fuelCostBreakdown: {
    baseCost: Number,
    surcharge: Number
  },
  createdAt: { type: Date, default: Date.now }
});

const Simulation= mongoose.model("Simulation", simulationSchema);
module.exports = Simulation;
