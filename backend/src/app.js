const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');
const driverRoutes = require('./routes/driver.routes');
const orderRoutes = require('./routes/order.routes');
const routeRoutes = require('./routes/route.routes');
const simulationRoutes = require('./routes/simulation.routes');

app.use(cors());
app.use(express.json());
connectDB()
// Basic route
app.get("/", (req, res) => {
  res.send("GreenCart Logistics Backend Running");
});
app.use("/api/drivers", driverRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/simulation", simulationRoutes);


module.exports = app;