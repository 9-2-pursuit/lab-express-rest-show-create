// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const logsController = require("./controllers/logsController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.send("Ahoy, matey! Welcome to the captain's log.");
});

app.use("/logs", logsController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).json({ error: "Page Not Found" });
});

// EXPORT
module.exports = app;
