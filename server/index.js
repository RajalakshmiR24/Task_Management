const express = require("express");
const cors = require("cors");
require("dotenv").config(); 

const connectDB = require("./database/db");
const userRoutes = require("./routes/user"); // Import user routes
const taskRoutes = require("./routes/task");

const app = express();
const PORT = process.env.PORT; 

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Backend with .env and MongoDB is running!");
});

// Use the user routes for user-related APIs
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
