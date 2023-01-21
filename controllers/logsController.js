
const express = require("express");
const logs = express.Router();
const operations = require("./operations");
const logsArr = require("../models/log");
const validate = require("../models/validate");

logs.get("/", (req, res) => {
  const { order, mistakes, lastCrisis } = req.query;
  
  if (!order && !mistakes && !lastCrisis) {
    res.json(logsArr);
  } else {
    let toReturn = logsArr;
    if (order) {
      toReturn = operations.order(order, toReturn);
    }
    if (mistakes) {
      toReturn = operations.mistakes(mistakes, toReturn);
    }
    if (lastCrisis) {
      toReturn = operations.lastCrisis(lastCrisis, toReturn);
    }

    res.json(toReturn);
  }
});

logs.post("/", validate, (req, res) => {
  console.log(req.body);
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
  const { index } = req.params;
  if (logsArr[index]) {
    logsArr.splice(index, 1);
    res.json(logsArr);
  } else {
    res.redirect("/404");
  }
});

logs.put("/:index", validate, (req, res) => {
  const { index } = req.params;
  if (logsArr[index]) {
    logsArr[index] = req.body;
    res.send(logsArr);
  } else {
    res
      .status(400)
      .json({ error: "something went wrong when trying to update" });
  }
});

module.exports = logs;