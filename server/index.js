const express = require("express");
const cors = require("cors");
require("dotenv").config(); 

const connectDB = require("./database/db");
const userRoutes = require("./routes/user"); 
const taskRoutes = require("./routes/task");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://task-management-lemon-pi.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend with .env and MongoDB is running!");
});


app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
