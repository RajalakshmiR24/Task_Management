const Task = require("../models/Task"); 

const parseDueDate = require("../utils/parseDueDate"); 

exports.createTask = async (req, res) => {
  try {
    const { taskName, description, dueDate } = req.body;

    const utcDueDate = parseDueDate(dueDate);

    if (!utcDueDate) {
      return res.status(400).json({
        code: 400,
        message: "Invalid due date format",
      });
    }

    const existingTask = await Task.findOne({
      userId: req.user.userId,
      taskName: taskName.trim(),
    });

    if (existingTask) {
      return res.status(400).json({
        code: 400,
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
      code: 201,
      message: "Task created successfully",
      task: task,
    });
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).json({
      code: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).select(
      "-__v -updatedAt -userId"
    );

    if (tasks.length === 0) {
      return res.status(200).json({ code: 404, message: "No data found" });
    }

    res.status(200).json({ code: 200, tasks });
  } catch (err) {
    res
      .status(200)
      .json({ code: 500, message: "Server error", error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId, dueDate, taskName, description } = req.body;

    if (!taskId) {
      return res
        .status(400)
        .json({ code: 400, message: "Task ID is required" });
    }

    const updates = {};

    if (taskName !== undefined) {
      updates.taskName = taskName.trim();
    }

    if (description !== undefined) {
      updates.description = description;
    }

    if (dueDate !== undefined) {
      const utcDueDate = parseDueDate(dueDate);
      if (!utcDueDate) {
        return res
          .status(400)
          .json({ code: 400, message: "Invalid due date format" });
      }
      updates.dueDate = utcDueDate;
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.userId },
      updates,
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ code: 404, message: "Task not found or unauthorized" });
    }

    res.status(200).json({
      code: 200,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, message: "Server error", error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res
        .status(200)
        .json({ code: 400, message: "Task ID is required" });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(2).json({ code: 404, message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this task" });
    }

    await Task.deleteOne({ _id: taskId });

    res.status(200).json({ code: 200, message: "Task deleted successfully" });
  } catch (err) {
    console.error(err.message, "Error deleting task:");
    res
      .status(200)
      .json({ code: 500, message: "Server error", error: err.message });
  }
};
