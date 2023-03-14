const express = require("express");
const router = express.Router();
const Task = require("../../models/task");

// Create a new task
router.post("/api/task", async (req, res) => {
  try {
    const { taskName, description, dueDate, period, periodType, taskListId } =
      req.body;

    // Validate period and due date
    const currentDate = new Date();
    const periodDate = new Date(period);
    const dueDateObject = new Date(dueDate);
    const lastDateOfMonth = new Date(
      dueDateObject.getFullYear(),
      dueDateObject.getMonth() + 1,
      0
    );
    const lastDateOfYear = new Date(dueDateObject.getFullYear(), 12, 0);

    if (
      (periodType === "monthly" && periodDate >= lastDateOfMonth) ||
      (periodType === "quarterly" && periodDate >= lastDateOfMonth) ||
      (periodType === "yearly" && periodDate >= lastDateOfYear)
    ) {
      return res.status(400).json({ message: "Invalid period date." });
    }

    if (dueDateObject <= periodDate) {
      return res
        .status(400)
        .json({ message: "Due date should be after end of period." });
    }

    const task = new Task({
      taskName,
      description,
      dueDate,
      period,
      periodType,
      taskListId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Export the router
module.exports = router;
