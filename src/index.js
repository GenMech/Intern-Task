const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const tasklist = require("./routes/api/tasklist");
const task = require("./routes/api/task");

const app = express();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

app.use("/api/tasklist", tasklist);
app.use("/api/task", task);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
