const express = require("express");
const logs = express.Router();

const logsArr = require("../models/log");

logs.get("/", (req, res) => {
  res.json(logsArr);
});

logs.post("/", (req, res) => {
  logsArr.push(req.body);
  res.json(logsArr[logsArr.length - 1]);
});

logs.get("/:index", (req, res) => {
  const index = Number(req.params.index);
  if (logsArr[index]) {
    res.json(logsArr[index]);
  } else {
    res.redirect("/404");
  }
});

logs.delete("/:index", (req, res) => {
  const index = req.params;
  console.log(index);
  logsArr.splice(index, 1);
  console.log(logsArr.length);
  res.json(logsArr);
});

module.exports = logs;
