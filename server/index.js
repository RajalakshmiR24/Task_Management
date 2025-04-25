
const express = require("express");
const cors = require("cors");
require("dotenv").config(); 


const connectDB = require("./database/db");

const app = express();
const PORT = process.env.PORT;


connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend with .env and MongoDB is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
