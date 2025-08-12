const Route = require("../models/route.model");

// Get all routes
exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json({message: "Routes retrieved successfully", routes});
  } catch (err) {
    console.error("Error retrieving routes:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get single route
exports.getRoute = async (req, res) => {
  try {
    const {id} = req.params;
    const route = await Route.findById(id);
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json({message: "Route retrieved successfully", route});
  } catch (err) {
    console.error("Error retrieving route:", err);
    res.status(500).json({ error: err.message });
  }
};

// Create route
exports.createRoute = async (req, res) => {
  try {
    console.log("Creating route with data:", req.body);
    const route = await Route.create(req.body);
    res.status(201).json({message: "Route created successfully", route});
  } catch (err) {
    console.error("Error creating route:", err);
    res.status(400).json({ error: err.message });
  }
};

// Update route
exports.updateRoute = async (req, res) => {
  try {
    const {id} = req.params;
    console.log("Updating route with ID:", id, "and data:", req.body);
    const route = await Route.findByIdAndUpdate(id, req.body, { new: true });
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json({message: "Route updated successfully", route});
  } catch (err) {
    console.error("Error updating route:", err);
    res.status(400).json({ error: err.message });
  }
};

// Delete route
exports.deleteRoute = async (req, res) => {
  try {
    const {id} = req.params;
    const route = await Route.findByIdAndDelete(id);
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json({ message: "Route deleted" });
  } catch (err) {
    console.error("Error deleting route:", err);
    res.status(500).json({ error: err.message });
  }
};
