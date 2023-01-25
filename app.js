const express = require("express");
const app = express();

const logs = require("./models/log");
const v2 = require("./v2/controllers/logsController");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the captain's log");
});

app.get("/logs", (req,res) => {
    res.send(logs);
});

app.get("/logs/:logId", (req, res) => {
    const { logId } = req.params;
    const log = logs[logId];
    if (log) {
        res.send(log)
    } else {
        res.status(300).redirect("/logs");
    }
})

const validateBody = (req, res, next) => {
    const log = req.body;
    if (!log.captainName || typeof log.captainName !== "string") {
        res.status(404).send({ error: "Requires a valid captainName as a string." });
    } else if (!log.title || typeof log.title !== "string") {
        res.status(404).send({ error: "Requires a valid title as a string." });
    } else if (!log.post || typeof log.post !== "string") {
        res.status(404).send({ error: "Requires a valid post as a string." });
    } else if (typeof log.mistakesWereMadeToday !== "boolean") {
      res.status(404).send({ error: "Requires mistakesWereMadeToday as a boolean." });
    } else if (typeof log.daysSinceLastCrisis !== "number") {
      res.status(404).send({ error: "Requires daysSinceLastCrisis as a number." });
    } else {
        next()
    }
}

app.post("/logs", validateBody, (req, res) => {
    // let log = req.body;
    logs.push(req.body);
    res.status(300).redirect("/logs");
})

app.use("/v2", v2);

app.delete("/logs/:logId", (req, res) => {
    const log = logs[req.params.logId];
    if (log) {
        logs.splice(req.params.logId, 1);
        res.redirect("/logs");
    } else {
        res.status(400).redirect();
    }
})

app.put("/logs/:logId", validateBody, (req, res) => {
    const log = logs[req.params.logId];
    if (log) {
        logs[req.params.logId] = req.body;
        res.redirect("/logs");
    } else {
        res.status(400).redirect();
    }
})

app.get("*", (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

module.exports = app;