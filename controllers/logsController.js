const express = require("express");
const logs = express.Router();
const logsModel = require("../models/log");

// INDEX
const logsArr = [...logsModel];

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

  if (logsModel[id]) {
    res.json(logsModel[id]);
  } else {
    res.redirect("/*");
  }
});

// CREATE
logs.post("/", (req, res) => {
  logsModel.push(req.body);
  res.status(200).json(logsModel[logsModel.length - 1]);
});

// DELETE
logs.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (logsModel[id]) {
    const deletedLog = logsModel.splice(id, 1);
    res.status(200).json(deletedLog);
  } else {
    res.redirect("/*");
  }
});

// UPDATE
logs.put("/:id", (req, res) => {
  const { id } = req.params;

  if (logsModel[id]) {
    logsModel[id] = req.body;
    res.status(200).json(logsModel[id]);
  } else {
    res.status(404).redirect("/*");
  }
});

module.exports = logs;
