const express = require("express");

const app = express();

app.use(express.json());

const logController = require("./controllers/log.controller.js");

app.use("/logs", logController);

app.use("/", (req, res) => {
  res.send("welcome to the captain's log");
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

module.exports = app;
