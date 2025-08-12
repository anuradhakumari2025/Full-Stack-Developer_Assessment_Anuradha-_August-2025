const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("MongoDB database connection established successfully")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;
