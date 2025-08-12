const mongoose = require("mongoose");
const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    currentShiftHours: { type: Number, default: 0 },
    past7DaysWorkHours: { type: [Number], default: [] }, // array of last 7 days' work hours
  },
  { timestamps: true }
);

const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;
