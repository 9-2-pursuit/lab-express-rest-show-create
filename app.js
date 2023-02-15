const express = require("express");
const app = express();

const logs = require("./models/log.js");
const v2 = require("./v2/controllers/logsController.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Captain's Log");
});

app.get("/logs", (req, res) => {
  const { order, mistakes, lastCrisis } = req.query;
  let logsToSend = logs;
  if (order) {
    const multi = order === "asc" ? 1 : -1;
    logsToSend = logsToSend.sort(
      (a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1) * multi
    );
  }

  if (mistakes) {
    logsToSend = logsToSend.filter(
      (log) => log.mistakesWereMadeToday.toString() === mistakes
    );
  }

  if (lastCrisis) {
    const number = lastCrisis.match(/\d+/[0]);
    console.log(number);

    if (lastCrisis.startsWith("gte")) {
      logsToSend = logsToSend.filter(
        (log) => log.daysSinceLastCrisis >= number
      );
    } else if (lastCrisis.startsWith("gt")) {
      (log) => log.daysSinceLastCrisis > number;
    } else if (lastCrisis.startsWith("lte")) {
      (log) => log.daysSinceLastCrisis <= number;
    } else if (lastCrisis.startsWith("lt")) {
      (log) => log.daysSinceLastCrisis < number;
    }
  }
  res.send(logsToSend);
});

app.get("/logs/:logId", (req, res) => {
  const { logId } = req.params;
  const matchingLog = logs[logId];
  if (!matchingLog) {
    res.status(300).redirect("/not-found");
    // res.status(404).send({ error: "No Log Found" });
  } else {
    res.send(matchingLog);
  }
});

const validateBody = (req, res, next) => {
  const log = req.body;
  if (!log.captainName || typeof log.captainName !== "string") {
    res.status(400).send({ error: "requires CaptainName as a valid string" });
  } else if (!log.title || typeof log.title !== "string") {
    res.status(400).send({ error: "requires Title a valid string" });
  } else if (!log.post || typeof log.post !== "string") {
    res.status(400).send({ error: "requires Post as a valid string" });
  } else if (typeof log.mistakesWereMadeToday !== "boolean") {
    res
      .status(400)
      .send({ error: "requires mistakesWereMadeToday as a boolean" });
  } else if (
    !log.daysSinceLastCrisis ||
    typeof log.daysSinceLastCrisis !== "number"
  ) {
    res
      .status(400)
      .send({ error: "requires DaysSinceLastCrisis as a valid number" });
  } else {
    next();
  }
};

app.post("/logs", validateBody, (req, res) => {
  logs.push(req.body);
  res.status(300).redirect("/logs");
});

app.use("v2", v2);

app.delete("/logs/:logIndex", (req, res) => {
  const log = logs[req.params.logIndex];
  if (log) {
    logs.splice(req.params.logIndex, 1);
    res.redirect("/logs");
  } else {
    res.redirect("/not-found");
  }
});

app.put("/logs/:logId", (req, res) => {
  const log = logs[req.params.logIndex];

  if (log) {
    logs[req.params.logIndex] = req.body;
    res.redirect("/logs");
  } else {
    res.redirect("/not-found");
  }
});

app.get("*", (req, res) => {
  res.status(404).send({ error: "page not found" });
});

module.exports = app;
