const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log");

logs.get("/", (req, res) => {
  res.json(logsArray);
});

// SHOW
logs.get("/:id", (req, res) => {
  const { id } = req.params;
  if (logsArray[id]) {
    res.json(logsArray[id]);
  } else {
    res.redirect("/*");
  }
});

module.exports = logs;
