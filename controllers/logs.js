const express = require("express");
const logs = express();

const logModel = require("../models/log");

logs.use(express.json());

logs.get("/:arrayIndex", (req, res) => {
  console.log(req.params.arrayIndex);
  if (logModel[req.params.arrayIndex]) {
    res.send(logModel[req.params.arrayIndex]);
  } else {
    res.redirect("/404");
  }
});

logs.get("/", (req, res) => {
  res.send(logModel);
});

logs.post("/", (req, res) => {
  logModel.push(req.body);
  res.json(logModel[logModel.length - 1]);
  console.log(logModel);
});

logs.delete("/:indexArray", (req, res) => {
  const rmLog = logModel.splice(req.params.indexArray, 1);
  res.status(200).json(rmLogk);
});

module.exports = logs;
