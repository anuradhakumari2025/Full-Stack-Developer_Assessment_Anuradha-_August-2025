const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    valueRs: { type: Number, required: true },
    assignedRoute: { type: String, required: true },
    deliveryTimestamp: { type: Date, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
