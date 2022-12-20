const express = require("express");
const logsController = require("./controllers/logsController.js");
const logsControllerV2 = require("./v2/controllers/logsController");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Captain's Log!");
});

app.use("/logs", logsController);

app.use("/v2/logs", logsControllerV2);

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

module.exports = app;
