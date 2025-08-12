const Order = require("../models/order.model");

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({message: "Orders retrieved successfully", orders});
  } catch (err) {
    console.error("Error retrieving orders:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const {id} = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({message: "Order retrieved successfully", order});
  } catch (err) {
    console.error("Error retrieving order:", err);
    res.status(500).json({ error: err.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    console.log("Creating order with data:", req.body);
    const order = await Order.create(req.body);
    res.status(201).json({message: "Order created successfully", order});
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(400).json({ error: err.message });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const {id} = req.params;
    console.log("Updating order with ID:", id, "and data:", req.body);
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({message: "Order updated successfully", order});
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(400).json({ error: err.message });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const {id} = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ error: err.message });
  }
};
