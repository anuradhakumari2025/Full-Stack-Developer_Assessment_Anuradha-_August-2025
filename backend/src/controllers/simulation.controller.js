const Driver = require("../models/driver.model");
const Route = require("../models/route.model");
const Order = require("../models/order.model");
const Simulation = require("../models/simulation.model");

exports.runSimulation = async (req, res) => {
  try {
    const { availableDrivers, startTime, maxHoursPerDriver } = req.body;

    if (!availableDrivers || !startTime || !maxHoursPerDriver) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const orders = await Order.find();
    const routes = await Route.find();

    let totalProfit = 0;
    let onTimeDeliveries = 0;
    let lateDeliveries = 0;
    let baseFuelCost = 0;
    let fuelSurcharge = 0;

    // Driver schedule tracking
    let driverHoursUsed = Array(Number(availableDrivers)).fill(0);
    const shiftStartHour = parseInt(startTime.split(":")[0], 10);

    orders.forEach(order => {
      const route = routes.find(r => r.routeId === order.assignedRoute);
      if (!route) return;

      // Find driver with least hours used
      let driverIndex = driverHoursUsed.indexOf(Math.min(...driverHoursUsed));
      let currentDriverHours = driverHoursUsed[driverIndex];

      // Delivery time (in hours)
      let deliveryTimeHours = route.baseTime / 60;

      // Check if driver exceeds max hours
      if (currentDriverHours + deliveryTimeHours > Number(maxHoursPerDriver)) {
        lateDeliveries++;
        totalProfit -= 50; // Penalty for missed delivery
        return;
      }

      // Assign order to driver
      driverHoursUsed[driverIndex] += deliveryTimeHours;

      // Fuel cost
      let orderFuelCost = route.distanceKm * 5;
      if (route.trafficLevel === "High") {
        orderFuelCost += route.distanceKm * 2;
        fuelSurcharge += route.distanceKm * 2;
      }
      baseFuelCost += route.distanceKm * 5;

      // Calculate deadline
      const deliveryDeadline = route.baseTime + 10; // minutes
      const simulatedDeliveryTime = route.baseTime; // simple base time in mins

      let penalty = 0;
      let bonus = 0;

      if (simulatedDeliveryTime > deliveryDeadline) {
        penalty = 50;
        lateDeliveries++;
      } else {
        onTimeDeliveries++;
        if (order.valueRs > 1000) {
          bonus = order.valueRs * 0.1;
        }
      }

      const orderProfit = order.valueRs + bonus - penalty - orderFuelCost;
      totalProfit += orderProfit;
    });

    const efficiencyScore = (onTimeDeliveries / orders.length) * 100;

    // Save simulation result
    await Simulation.create({
      availableDrivers,
      startTime,
      maxHoursPerDriver,
      totalProfit,
      efficiencyScore,
      onTimeDeliveries,
      lateDeliveries,
      fuelCostBreakdown: {
        baseCost: baseFuelCost,
        surcharge: fuelSurcharge
      }
    });

    res.status(200).json({
      totalProfit,
      efficiencyScore,
      onTimeDeliveries,
      lateDeliveries,
      fuelCostBreakdown: {
        baseCost: baseFuelCost,
        surcharge: fuelSurcharge
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLatestSimulation = async (req, res) => {
  try {
    const latest = await Simulation.findOne().sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ message: "No simulations found" });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
