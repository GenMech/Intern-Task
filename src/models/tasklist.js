const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const TaskList = mongoose.model("TaskList", taskListSchema);

module.exports = TaskList;
