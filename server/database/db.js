
const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("MONGODB_URI:", process.env.MONGODB_URI);  
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in .env");
    process.exit(1); 
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;
