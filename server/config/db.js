const mongoose = require("mongoose");

const connectDB = async (link) => {
  const conn = mongoose.connect(link);
  console.log(`MongoDB connected `);
};
module.exports = connectDB;
