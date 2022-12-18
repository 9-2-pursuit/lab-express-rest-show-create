const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log");
const { validateLog } = require("../models/validations");

logs.get("/", (req, res) => {
  const { order, mistakes, lastCrisis } = req.query;
  let logsArrayCopy = [...logsArray];
  // Order query logic
  if (order === "asc") {
    logsArrayCopy.sort((logA, logB) => {
      return logA.title > logB.title ? 1 : -1;
    });
  } else if (order === "desc") {
    logsArrayCopy.sort((logA, logB) => {
      return logA.title > logB.title ? -1 : 1;
    });
  }

  // Mistakes Query logic
  if (mistakes === "true") {
    logsArrayCopy = logsArrayCopy.filter((log) => {
      return log.mistakesWereMadeToday;
    });
  } else if (mistakes === "false") {
    logsArrayCopy = logsArrayCopy.filter((log) => {
      return !log.mistakesWereMadeToday;
    });
  }

  // lastCrisis query logic
  if (lastCrisis === "gt10") {
    logsArrayCopy = logsArrayCopy.filter((log) => {
      return log.daysSinceLastCrisis > 10;
    });
  } else if (lastCrisis === "gt20") {
    logsArrayCopy = logsArrayCopy.filter((log) => {
      return log.daysSinceLastCrisis > 20;
    });
  } else if (lastCrisis === "lte5") {
    logsArrayCopy = logsArrayCopy.filter((log) => {
      return log.daysSinceLastCrisis <= 5;
    });
  }

  // Send logsArrayCopy
  res.json(logsArrayCopy);
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

// CREATE
logs.post("/", validateLog, (req, res) => {
  logsArray.push(req.body);
  res.json(logsArray[logsArray.length - 1]);
});

module.exports = logs;
