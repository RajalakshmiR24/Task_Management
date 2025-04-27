const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controllers/taskController");
const { protect } = require("../middleware/auth");
const { validateTask } = require("../utils/Validation"); 
const { validationResult } = require("express-validator");


const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};


taskRouter.post("/create", protect, validateTask, handleValidation, taskController.createTask);
taskRouter.get("/tasks", protect, taskController.getTasks);
taskRouter.post("/update", protect, taskController.updateTask);
taskRouter.post("/delete", protect, taskController.deleteTask);

module.exports = taskRouter;
