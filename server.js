require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/students");

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json()); // lets req.body hold parsed JSON

app.get("/", (req, res) => {
  res.json({ message: "Student Records API is running" });
});

app.use("/api/students", studentRoutes);

// Unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Connect to MongoDB first, then start listening
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
