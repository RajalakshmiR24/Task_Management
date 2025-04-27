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
      return res.status(200).json({ code:400, message: "Invalid due date format" });
    }

    const existingTask = await Task.findOne({
      userId: req.user.userId,
      taskName: taskName.trim(),
    });

    if (existingTask) {
      return res.status(200).json({
        code:400,
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
      code:201,
      message: "Task created successfully",
    });
  } catch (err) {
    console.error(err.message, "Error creating task:");
    res.status(200).json({ code:500, message: "Server error", error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).select(
      "-__v -updatedAt -userId"
    );

    if (tasks.length === 0) {
      return res.status(200).json({ code:404, message: "No data found" });
    }

    res.status(200).json({code:200, tasks});
  } catch (err) {
    res.status(200).json({ code:500,message: "Server error", error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId, dueDate, taskName, description } = req.body;

    if (!taskId) {
      return res.status(200).json({ code: 400, message: "Task ID is required" });
    }

    const updates = {};

    if (taskName !== undefined) {
      updates.taskName = taskName.trim();
    }

    if (description !== undefined) {
      updates.description = description;
    }

    if (dueDate !== undefined) {
      const [datePart, timePart, meridian] = dueDate.split(/[\s:]+/);
      const [month, day, year] = datePart.split("/").map(Number);
      let hour = Number(timePart);
      const minute = Number(dueDate.split(/[\s:]+/)[2]);

      if (meridian.toUpperCase() === "PM" && hour < 12) hour += 12;
      if (meridian.toUpperCase() === "AM" && hour === 12) hour = 0;

      const utcDueDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

      if (isNaN(utcDueDate.getTime())) {
        return res.status(200).json({ code: 400, message: "Invalid due date format" });
      }

      updates.dueDate = utcDueDate;
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.userId },
      updates,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(200).json({ code: 404, message: "Task not found or unauthorized" });
    }

    res.status(200).json({
      code: 200,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    res.status(200).json({ code: 500, message: "Server error", error: err.message });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(200).json({ code:400,message: "Task ID is required" });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(2).json({ code:404, message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this task" });
    }

    await Task.deleteOne({ _id: taskId });

    res.status(200).json({ code:200, message: "Task deleted successfully" });
  } catch (err) {
    console.error(err.message, "Error deleting task:");
    res.status(200).json({ code:500, message: "Server error", error: err.message });
  }
};
