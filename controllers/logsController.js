const express = require("express");
const logs = express.Router();
const logsModel = require("../models/log");

const logsArr = [...logsModel];

// INDEX
logs.get("/", (req, res) => {
  const { order, mistakes, lastCrisis } = req.query;

  if (order === "asc") {
    return logsArr.sort((a, b) => a.title.localeCompare(b.title));
  } else if (order === "desc") {
    return logsArr.sort((a, b) => b.title.localeCompare(a.title));
  }

  if (mistakes === "true") {
    logsArr = logsArr.filter((log) => {
      return log.mistakesWereMadeToday;
    });
  } else if (mistakes === "false") {
    logsArr = logsArr.filter((log) => {
      return !log.mistakesWereMadeToday;
    });
  }

  if (lastCrisis === "gt10") {
    logsArr = logsArr.filter((log) => {
      return log.daysSinceLastCrisis > 10;
    });
  } else if (lastCrisis === "gt20") {
    logsArr = logsArr.filter((log) => {
      return log.daysSinceLastCrisis > 20;
    });
  } else if (lastCrisis === "lte5") {
    logsArr = logsArr.filter((log) => {
      return log.daysSinceLastCrisis <= 5;
    });
  }

  res.json(logsArr);
});

// SHOW
logs.get("/:id", (req, res) => {
  const { id } = req.params;

  if (logsArr[id]) {
    res.json(logsArr[id]);
  } else {
    res.redirect("/*");
  }
});

// CREATE
logs.post("/", (req, res) => {
  logsArr.push(req.body);
  res.status(200).json(logsArr[logsArr.length - 1]);
});

// DELETE
logs.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (logsArr[id]) {
    const deletedLog = logsArr.splice(id, 1);
    res.status(200).json(deletedLog);
  } else {
    res.redirect("/*");
  }
});

// UPDATE
logs.put("/:id", (req, res) => {
  const { id } = req.params;

  if (logsArr[id]) {
    logsArr[id] = req.body;
    res.status(200).json(logsArr[id]);
  } else {
    res.status(404).redirect("/*");
  }
});

module.exports = logs;
