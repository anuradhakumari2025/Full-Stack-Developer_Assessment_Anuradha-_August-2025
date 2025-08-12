const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');

app.use(cors());
app.use(express.json());
connectDB()
// Basic route
app.get("/", (req, res) => {
  res.send("GreenCart Logistics Backend Running");
});

module.exports = app;