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
    const drivers = await Driver.find();

    let totalProfit = 0;
    let onTimeDeliveries = 0;
    let lateDeliveries = 0;
    let baseFuelCost = 0;
    let fuelSurcharge = 0;

    orders.forEach(order => {
      const route = routes.find(r => r.routeId === order.assignedRoute);
      if (!route) return;

      // Fuel cost
      let orderFuelCost = route.distanceKm * 5;
      if (route.trafficLevel === "High") {
        orderFuelCost += route.distanceKm * 2;
        fuelSurcharge += route.distanceKm * 2;
      }
      baseFuelCost += route.distanceKm * 5;

      const simulatedDeliveryTime = route.baseTime; // base time in mins
      const deliveryDeadline = route.baseTime + 10;

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

    // Saving simulation result
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

    res.json({
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
