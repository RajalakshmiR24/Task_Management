const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { taskName, description, dueDate } = req.body;

    const task = new Task({
      userId: req.user.userId,
      taskName,
      description,
      dueDate,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
 
  
  try {
    const tasks = await Task.find({ userId: req.user.userId }).select("-__v -updatedAt -_id -userId");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get one task by ID (taskId from req.body)
exports.getTaskById = async (req, res) => {
  try {
    const { taskId } = req.body;

    const task = await Task.findOne({ _id: taskId, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update task (taskId and updates in req.body)
exports.updateTask = async (req, res) => {
  try {
    const { taskId, ...updates } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.userId },
      updates,
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found or unauthorized" });

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete task (taskId from req.body)
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    const deleted = await Task.findOneAndDelete({ _id: taskId, userId: req.user.userId });
    if (!deleted) return res.status(404).json({ message: "Task not found or unauthorized" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
