const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { taskName, description, dueDate } = req.body;

    const [datePart, timePart, meridian] = dueDate.split(/[\s:]+/);
    const [month, day, year] = datePart.split("/").map(Number);
    let hour = Number(timePart);
    const minute = Number(dueDate.split(/[\s:]+/)[2]);

    if (meridian.toUpperCase() === "PM" && hour < 12) hour += 12;
    if (meridian.toUpperCase() === "AM" && hour === 12) hour = 0;

    const utcDueDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

    if (isNaN(utcDueDate.getTime())) {
      return res.status(400).json({ message: "Invalid due date format" });
    }

    const existingTask = await Task.findOne({
      userId: req.user.userId,
      taskName: taskName.trim(),
    });

    if (existingTask) {
      return res.status(400).json({
        message: "Task with the same name already exists for this user",
      });
    }

    const task = new Task({
      userId: req.user.userId,
      taskName: taskName.trim(),
      description,
      dueDate: utcDueDate,
    });

    await task.save();

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).select(
      "-__v -updatedAt -_id -userId"
    );

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId, ...updates } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.userId },
      updates,
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this task" });
    }

    await Task.deleteOne({ _id: taskId });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
