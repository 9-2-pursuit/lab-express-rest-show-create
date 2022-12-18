// DEPENDENCIES
const express = require("express");
const logsController = require("./controllers/logsController");
const v2LogsController = require("./v2/controllers/logsController");

//CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json()); // parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to the captain's log");
});

app.use("/logs", logsController);

app.use("/v2/logs", v2LogsController);

// 404 Error
app.get("*", (req, res) => {
  res.status(404).json({ error: "Sorry, page not found" });
});

// EXPORT
module.exports = app;
