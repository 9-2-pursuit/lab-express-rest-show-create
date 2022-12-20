const express = require("express");
const logs = express.Router();
const operations = require("./operations");
const logsArr = require("../models/log");
const validate = require("../models/validate");

logs.get("/", (req, res) => {
  const query = req.query;

  // if there is no query, return logs
  if (!Object.keys(query).length) {
    res.json(logsArr);
  }

  // if there is query, invoke relevant function return result
  const result = operations[Object.keys(query)[0]](Object.values(query)[0]);
  res.json(result);
});

logs.post("/", validate, (req, res) => {
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

logs.put("/:index", (req, res) => {
  const { index } = req.params;
  logsArr[index] = req.body;
  res.send(logsArr);
});

module.exports = logs;
