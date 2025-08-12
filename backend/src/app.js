const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');
const driverRoutes = require('./routes/driver.routes');

app.use(cors());
app.use(express.json());
connectDB()
// Basic route
app.get("/", (req, res) => {
  res.send("GreenCart Logistics Backend Running");
});
app.use("/api/drivers", driverRoutes);


module.exports = app;