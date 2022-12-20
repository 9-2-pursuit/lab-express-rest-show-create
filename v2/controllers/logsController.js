const express = require("express");
const v2Logs = express.Router();
const logs = require("../../models/log");

v2Logs.get("/", (req, res) => {
  const html = logs
    .map(
      (log, index) => `<a href=${"/v2/logs/" + index}>
    ${log.title}</a>`
    )
    .join("\n");
  res.render("pages/home", { logs });
});

v2Logs.get("/:index", (req, res) => {
  const { index } = req.params;
  res.send(logs[index]);
});

module.exports = v2Logs;
