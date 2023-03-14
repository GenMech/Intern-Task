const express = require("express");
const router = express.Router();
const TaskList = require("../../models/tasklist");
const Task = require("../../models/task");

// Create a new task list
router.post("/api/tasklist", async (req, res) => {
  try {
    const { name, description, active } = req.body;
    const taskList = new TaskList({ name, description, active });
    await taskList.save();
    res.status(201).json(taskList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all tasks for a specific task list
router.get("/api/tasklist/:id/task", async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Task.find({ taskListId: id }).populate(
      "taskListId",
      "name"
    );
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Export the router
module.exports = router;
