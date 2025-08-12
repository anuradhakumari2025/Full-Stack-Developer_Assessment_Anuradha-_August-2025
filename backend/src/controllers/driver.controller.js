const Driver = require("../models/driver.model");

// Get all drivers
exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(201).json({message: "Drivers fetched successfully", drivers});
  } catch (err) {
    console.error("Error fetching drivers:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get single driver
exports.getDriver = async (req, res) => {
  try {
    const {id} = req.params;
    const driver = await Driver.findById(id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(201).json({message: "Driver fetched successfully", driver});
  } catch (err) {
    console.error("Error fetching driver:", err);
    res.status(500).json({ error: err.message });
  }
};

// Create driver
exports.createDriver = async (req, res) => {
  try {
    const {name,currentShiftHours,past7DaysWorkHours}=req.body;
    const driver = await Driver.create({name,currentShiftHours,past7DaysWorkHours});
    res.status(201).json({message: "Driver created successfully", driver});
  } catch (err) {
    console.error("Error creating driver:", err);
    res.status(400).json({ error: err.message });
  }
};

// Update driver
exports.updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json(driver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete driver
exports.deleteDriver = async (req, res) => {
  try {
    const {id} = req.params;
    const driver = await Driver.findByIdAndDelete(id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json({ message: "Driver deleted" });
  } catch (err) {
    console.error("Error deleting driver:", err);
    res.status(500).json({ error: err.message });
  }
};
