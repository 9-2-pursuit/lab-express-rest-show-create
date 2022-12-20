const express = require("express");
const logs = express.Router();
const logsArray = require("../../models/log");

logs.get("/", (req, res) => {
  res.send(
    logsArray
      .map(
        (l, i) =>
          `<ul><li><a href=/v2/logs/${i}>${l.title} - ${l.captainName}</a></li></ul>`
      )
      .join("")
  );
});

logs.get("/:index", (req, res) => {
  let foundIndex = logsArray[req.params.index];
  if (foundIndex) {
    const {
      captainName,
      title,
      post,
      mistakesWereMadeToday,
      daysSinceLastCrisis,
    } = foundIndex;

    res.send(
      `<div style="text-align: center; padding-top: 60px"><h1 style="letter-spacing: 2px">${title}</h1> BY <h2>${captainName}</h2><p> Quote: <span style="font-size: x-large">"${post}"</span></p>Mistakes Made Today: <span style="color:${
        mistakesWereMadeToday ? "red" : "green"
      }; font-size: larger">${mistakesWereMadeToday}</span></p> <p>Days Since Last Crisis: <span style="color: blue; font-size: larger">${daysSinceLastCrisis}</span></p> <button onclick="window.location.href='/v2/logs'">Back</button></div>`
    );
  } else {
    res.redirect("/logs/NotFound");
    res.status(404);
  }
});

module.exports = logs;
