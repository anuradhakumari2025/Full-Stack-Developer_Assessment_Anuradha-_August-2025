const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    routeId: { type: String, required: true, unique: true },
    distanceKm: { type: Number, required: true },
    trafficLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    baseTime: { type: Number, required: true }, // in minutes
  },
  { timestamps: true }
);

const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
