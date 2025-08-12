const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const connectDB = require("../db/db");

const Driver = require("../models/driver.model");
const Route = require("../models/route.model");
const Order = require("../models/order.model");

// Function to load CSV into DB
const importCSV = async (filePath, model, mapRow) => {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => data.push(mapRow(row)))
      .on("end", async () => {
        try {
          await model.deleteMany({});
          await model.insertMany(data);
          console.log(
            `Imported ${data.length} records into ${model.modelName}`
          );
          resolve();
        } catch (err) {
          reject(err);
        }
      });
  });
};

const startImport = async () => {
  await connectDB();
  try {
    await importCSV(
      path.join(__dirname, "../utils/drivers.csv"),
      Driver,
      (row) => ({
        name: row.name,
        currentShiftHours: isNaN(Number(row.shift_hours))
          ? 0
          : Number(row.shift_hours),
        past7DaysWorkHours: row.past_week_hours
          ? row.past_week_hours
              .split(",")
              .map((val) => (isNaN(Number(val)) ? 0 : Number(val)))
          : [],
      })
    );

    await importCSV(
      path.join(__dirname, "../utils/routes.csv"),
      Route,
      (row) => ({
        routeId: row.route_id,
        distanceKm: Number(row.distance_km),
        trafficLevel: row.traffic_level,
        baseTime: Number(row.base_time_min),
      })
    );

    await importCSV(
      path.join(__dirname, "../utils/orders.csv"),
      Order,
      (row) => {
        // Parsed delivery_time as "HH:mm" and set today's date
        let deliveryTimestamp = null;
        if (row.delivery_time) {
          const [hours, minutes] = row.delivery_time.split(":").map(Number);
          const now = new Date();
          deliveryTimestamp = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours,
            minutes
          );
        }
        return {
          orderId: row.order_id,
          valueRs: isNaN(Number(row.value_rs)) ? 0 : Number(row.value_rs),
          assignedRoute: row.route_id,
          deliveryTimestamp,
        };
      }
    );

    console.log("All CSV files imported successfully!");
    process.exit();
  } catch (err) {
    console.error("Import error:", err);
    process.exit(1);
  }
};

startImport();
