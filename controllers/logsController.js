const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");
const { validateURL } = require("../models/validations.js");

// logs.get("/", (req, res) => {
//     res.json(logsArray)
// })

logs.get("/", (req, res) => {
  let logsArrayCopy = [...logsArray];
  const { order, mistakes, lastCrisis } = req.query;

  if (order === "asc") {
    logsArrayCopy.sort((a, b) => (a.title > b.title ? 1 : -1));
  } else if (order === "desc") {
    logsArrayCopy.sort((a, b) => (a.title > b.title ? -1 : 1));
  }

  if (mistakes === "true") {
    logsArrayCopy = logsArrayCopy.filter(
      ({ mistakesWereMadeToday }) => mistakesWereMadeToday
    );
  } else if (mistakes === "false") {
    logsArrayCopy = logsArrayCopy.filter(
      ({ mistakesWereMadeToday }) => !mistakesWereMadeToday
    );
  }

  if (lastCrisis === "lte5") {
    logsArrayCopy = logsArrayCopy.filter(
      ({ daysSinceLastCrisis }) => daysSinceLastCrisis <= 5
    );
  } else if (lastCrisis === "gt10") {
    logsArrayCopy = logsArrayCopy.filter(
      ({ daysSinceLastCrisis }) => daysSinceLastCrisis > 10
    );
  } else if (lastCrisis === "gte20") {
    logsArrayCopy = logsArrayCopy.filter(
      ({ daysSinceLastCrisis }) => daysSinceLastCrisis >= 20
    );
  }

  res.json(logsArrayCopy);
});

logs.get("/:arrayIndex", (req, res) => {
  if (logsArray[req.params.arrayIndex]) {
    res.json(logsArray[req.params.arrayIndex]);
  } else {
    res.redirect("/");
    res.status(404).json({ error: "Not Found" });
  }
});

logs.post("/", validateURL, (req, res) => {
  logsArray.push(req.body);
  res.json(logsArray[logsArray.length - 1]);
});

module.exports = logs;
