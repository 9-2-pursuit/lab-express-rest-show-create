const express = require("express");
const v2Logs = express.Router();
const logsArray = require("../../models/log.js");

v2Logs.get("/", (req, res) => {
  let ulStr = "<ul>";
  // Map over logs array
  logsArray.map((log, i) => {
    ulStr += `<li><a href="/v2/logs/${i}">${log.title}</a></li>`;
  });
  ulStr += "</ul>";
  res.send(ulStr);
});

v2Logs.get("/:index", (req, res) => {
  const { index } = req.params;
  const log = logsArray[index];
  let logTitleStr = `<h1>${log.title}</h1>`;
  let logPostStr = `<p>Post: ${log.post}</p>`;
  let logCaptainNameHTML = `<p>By: ${log.captainName}</p>`;
  let logMistakesHTML = `<p>Mistakes made today? ${
    log.mistakesWereMadeToday ? "Yes" : "No"
  }</p>`;
  const backButton = `<a href="/v2/logs"><button>Back</button></a>`;
  let logLastCrisisHTML = `<p>Days since last crisis: ${log.daysSinceLastCrisis}</p>`;
  res.send(
    logTitleStr +
      logCaptainNameHTML +
      logPostStr +
      logMistakesHTML +
      logLastCrisisHTML +
      backButton
  );
});

module.exports = v2Logs;
