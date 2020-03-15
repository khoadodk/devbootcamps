require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = {};
  try {
    if (connection.isConnected) {
      console.log("---Using existing connection---");
      return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("----MongoDB connected----");
    // make sure the db is connected only once
    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
